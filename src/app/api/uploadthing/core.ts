import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "128MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // const fullUserData = await clerkClient.users.getuser(user.userId);
      // if (fullUserData?.privateMetadata?.["can-upload"] !== true)
      //   throw new UploadThingError("user does not have upload permission");

      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Rate limit reached");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(metadata, file);
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        key: file.key,
        size: file.size,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
