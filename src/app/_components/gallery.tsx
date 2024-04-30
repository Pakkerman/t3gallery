"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DownloadAllButton } from "~/components/downloadButton";
import { TrashSVG } from "~/components/svgs";

import { Button } from "~/components/ui/button";
import type { SelectImage } from "~/server/db/schema";

export function Gallery({ images }: { images: SelectImage[] }) {
  const [selecting, setSelecting] = useState(false);
  const [selections, setSelections] = useState<Array<number>>([]);

  const select = (id: number) => {
    if (selections.includes(id)) {
      setSelections([...selections.filter((item) => item !== id)]);
    } else {
      setSelections((prev) => [...prev, id]);
    }
  };

  return (
    <section>
      <ul className="flex select-none flex-wrap justify-center gap-4 p-4">
        {images.map((item) => (
          <Link
            key={item.id}
            href={selecting ? "" : `/img/${item.id}`}
            scroll={!selecting}
            onClick={() => {
              if (selecting) {
                select(item.id);
              }
            }}
          >
            <GalleryItem item={item} selected={selections.includes(item.id)} />
          </Link>
        ))}
      </ul>

      <div className="h-20" />

      <div
        className={`${selecting ? "opacity-100" : "opacity-0"} fixed bottom-0 z-0 h-20 w-full bg-black/40 backdrop-blur-sm transition `}
      />
      <div className="fixed bottom-0 z-50 flex h-20 w-full items-center justify-center ">
        <div className="flex w-full justify-between gap-2 px-4">
          <div
            className={`${selecting ? "translate-y-[0%] opacity-100" : "translate-y-[200%] opacity-0"} flex grow items-center justify-between transition ease-in`}
          >
            <Button variant="destructive" disabled={selections.length === 0}>
              <TrashSVG />
            </Button>

            <div className="flex items-center justify-center gap-2">
              <Button
                className="rounded-full"
                variant="default"
                onClick={() => {
                  if (selections.length === images.length) {
                    setSelections([]);
                  } else {
                    setSelections([...images.map((item) => item.id)]);
                  }
                }}
              >
                {`${selections.length} selected`}
              </Button>
              <DownloadAllButton
                disabled={selections.length === 0}
                images={images.filter((item) => selections.includes(item.id))}
              />
            </div>
          </div>
          <Button
            className={`${selecting ? "rounded-md" : "rounded-[50%]"} transition-all`}
            variant="default"
            onClick={() => {
              if (selecting) {
                setSelections([]);
              }

              setSelecting((prev) => !prev);
            }}
          >
            {selecting ? "X" : "+"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  item,
  selected,
}: {
  item: SelectImage;
  selected: boolean;
}) {
  return (
    <li
      className={`flex h-36 w-48 flex-col border-2 ${selected && "border-red-400 p-2"} transition`}
    >
      <div className="flex h-36 flex-col overflow-hidden rounded-md ">
        <Image
          className="h-[200px] object-cover"
          src={item.url}
          style={{ objectFit: "cover", height: "200px" }}
          width={192}
          height={192}
          alt={`image-${item.id}`}
        />
      </div>
    </li>
  );
}
