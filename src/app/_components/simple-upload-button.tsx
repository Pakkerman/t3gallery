"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
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

function UploadSVG() {
  return (
    <div className="h-8 w-8 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
    </div>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="spinner_GmWz" x="1" y="4" width="6" height="14" />
      <rect
        className="spinner_GmWz spinner_NuDr"
        x="9"
        y="4"
        width="6"
        height="14"
      />
      <rect
        className="spinner_GmWz spinner_OlQ0"
        x="17"
        y="4"
        width="6"
        height="14"
      />
    </svg>
  );
}

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
        <UploadSVG />
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
