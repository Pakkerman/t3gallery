"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { LoadingSpinnerSVG, UploadSVG } from "~/components/svgs";
import { Button } from "~/components/ui/button";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
//
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadButton() {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload_begin");
      toast(
        <div className="flex items-center gap-2">
          <LoadingSpinnerSVG />
          <span className="text-lg">Uploading...</span>
        </div>,
        { duration: 300000, id: "upload-begin" },
      );
    },
    onClientUploadComplete() {
      router.refresh();
      toast("Upload Complete", { duration: 3000, id: "upload-begin" });
    },

    onUploadError(error) {
      posthog.capture("upload error", { error });
      toast.dismiss("upload-begin");
      toast.error("Upload failed");
    },
  });

  return (
    <div>
      <label htmlFor="upload-button">
        <Button variant="ghost">
          <UploadSVG size={24} />
        </Button>
      </label>
      <input
        type="file"
        id="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
