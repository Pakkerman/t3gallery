import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((item) => (
        <div key={item.id} className="flex h-36 w-48 flex-col">
          <Link href={`/img/${item.id}`}>
            <div className="flex h-28 flex-col overflow-hidden">
              <Image
                src={item.url}
                style={{ objectFit: "contain", height: "200px" }}
                width={192}
                height={192}
                alt={`image-${item.id}`}
              />
            </div>
          </Link>
          <p className="">{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
