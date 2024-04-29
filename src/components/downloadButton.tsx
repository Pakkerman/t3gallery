"use client";
import { Button } from "~/components/ui/button";
import { DownloadSVG } from "./svgs";
import { SelectImage } from "~/server/db/schema";

export function DownloadAllButton({ images }: { images: SelectImage[] }) {
  return (
    <Button
      variant="default"
      onClick={() => {
        let i = 0;
        for (const image of images) {
          setTimeout(() => {
            download(image);
          }, i++ * 300);
        }
      }}
    >
      <DownloadSVG />
    </Button>
  );
}

export function DownloadButton({ image }: { image: SelectImage }) {
  return (
    <Button variant="default" onClick={() => download(image)}>
      <DownloadSVG />
    </Button>
  );
}

async function download(image: SelectImage): Promise<void> {
  const { url, name } = image;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("downloading error", error);
  }
}
