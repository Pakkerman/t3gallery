import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");

  const image = await getImage(idAsNumber);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="flex-shrink object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
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
  );
}
