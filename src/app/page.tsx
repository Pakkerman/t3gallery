import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((item) => (
        <div key={item.id} className="flex h-48 w-48 flex-col">
          <div className="flex flex-col">
            <Link href={`/img/${item.id}`}>
              <Image
                src={item.url}
                style={{ objectFit: "contain" }}
                width={192}
                height={192}
                alt={`image-${item.id}`}
              />
            </Link>
            <p className="">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <h1>Hello gallery (under construction)</h1>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
