"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

      <div className="fixed bottom-[2.5%] right-[5%] flex gap-2">
        {selecting && (
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
            {selections.length === images.length
              ? "Deselect all"
              : "Select all"}
          </Button>
        )}
        <Button
          className="rounded-full"
          variant="default"
          onClick={() => {
            // TODO: here
            if (selecting) {
              setSelections([]);
            }
            setSelecting((prev) => !prev);
          }}
        >
          {selecting ? selections.length : "+"}
        </Button>
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
