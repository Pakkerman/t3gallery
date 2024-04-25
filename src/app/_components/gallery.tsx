"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { SelectImage } from "~/server/db/schema";

export function Gallery({ images }: { images: SelectImage[] }) {
  const [selecting, setSelecting] = useState(false);

  return (
    <section className="flex select-none flex-wrap justify-center gap-4 p-4">
      {images.map((item) => (
        <Link key={item.key} href={`${selecting ? "#" : "/img/" + item.id}`}>
          <GalleryItem item={item} selecting={selecting} />
        </Link>
      ))}
      <Button
        className="fixed bottom-[2.5%] right-[5%] rounded-full"
        onClick={() => setSelecting((prev) => !prev)}
      >
        {selecting ? "+" : "X"}
      </Button>
    </section>
  );
}

function GalleryItem({
  item,
  selecting,
}: {
  item: SelectImage;
  selecting: boolean;
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [selecting]);

  return (
    <li
      className={`flex h-36 w-48 flex-col border-2 ${selected && "border-red-400 p-2"} transition`}
      onClick={() => {
        if (!selecting) return;
        setSelected((prev) => !prev);
      }}
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
