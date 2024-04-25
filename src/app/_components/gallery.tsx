"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SelectImage } from "~/server/db/schema";

export function Gallery({ images }: { images: SelectImage[] }) {
  return (
    <section className="flex select-none flex-wrap justify-center gap-4 p-4">
      {images.map((item) => (
        <Link key={item.key} href={`/img/${item.id}`}>
          <GalleryItem item={item} />
        </Link>
      ))}
    </section>
  );
}

function GalleryItem({ item }: { item: SelectImage }) {
  const [selected, setSelected] = useState(false);

  return (
    <li
      className={`flex h-36 w-48 flex-col border-2 ${selected && "border-red-400 p-2"} transition`}
      onClick={() => {
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
