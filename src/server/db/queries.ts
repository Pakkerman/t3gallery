import "server-only";

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { redirect } from "next/navigation";

import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import analyticsServerClient from "~/server/analytics";

const { deleteFiles } = new UTApi();

export async function getMyImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: eq(images.id, id),
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number, key: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  const success = await deleteFiles(key);
  if (!success) {
    console.log("something wrong with deleting on the ut side");
  }

  redirect("/");
}
