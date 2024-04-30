"use server";

import { and, eq, inArray } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { redirect } from "next/navigation";

import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import analyticsServerClient from "~/server/analytics";

const { deleteFiles } = new UTApi();

export async function deleteImages(id: number[]) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  console.log(id);

  const keys = await db
    .delete(images)
    .where(and(inArray(images.id, id), eq(images.userId, user.userId)))
    .returning({ deletedKey: images.key });

  // analyticsServerClient.capture({
  //   distinctId: user.userId,
  //   event: "delete image",
  //   properties: {
  //     imageId: id,
  //   },
  // });

  const keyArr = keys.map((item) => item.deletedKey);

  const success = await deleteFiles(keyArr);
  if (!success) {
    console.log("something wrong with deleting on the ut side");
  }

  redirect("/");
}
