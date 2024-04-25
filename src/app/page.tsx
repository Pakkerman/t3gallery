import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Gallery } from "./_components/gallery";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

export default async function HomePage() {
  const images = await getMyImages();

  return (
    <main className="h-full">
      <SignedOut>
        <div className="flex h-full w-full items-center justify-center text-center text-2xl">
          <p className="">Please sign in first</p>
        </div>
      </SignedOut>
      <SignedIn>
        <Gallery images={images} />
      </SignedIn>
    </main>
  );
}
