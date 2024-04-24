import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");

  const image = await getImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full flex-col items-center justify-between text-yellow-200">
      {/* TODO: finish layout */}
      <div className="h-0 w-[90%] grow ">
        <Image
          className="h-full w-full object-contain"
          src={image.url}
          width={1920}
          height={1080}
          alt={`image-${image.id}`}
        />
      </div>
      <div className="flex w-full shrink-0 flex-col border-b border-t">
        <div className="w-full border-b py-2 text-center">{image.name}</div>
        <div className="flex justify-between px-4 py-2">
          <div className="flex gap-2">
            <div className="flex flex-col ">
              <span>Uploaded By:</span>
              <span>{uploaderInfo.fullName}</span>
            </div>

            <div className="flex flex-col ">
              <span>Created On:</span>
              <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-2 ">
            <Button type="submit" className="flex">
              Download
            </Button>
            <form
              action={async () => {
                // BUG: won't redirect from back to "/" from modal
                "use server";
                await deleteImage(idAsNumber);
              }}
            >
              <Button type="submit" variant="destructive" className="flex">
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
