import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Gallery } from "./_components/gallery";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

export default async function HomePage() {
  return (
    <main className="h-full">
      <SignedOut>
        <div className="flex h-full w-full items-center justify-center text-center text-2xl">
          <p className="">Please sign in first</p>
        </div>
      </SignedOut>
      <SignedIn>
        <GalleryWrapper />
      </SignedIn>
    </main>
  );
}

// Work around for server-only query call
async function GalleryWrapper() {
  const images = await getMyImages();
  return <Gallery images={[...images, ...images, ...images]} />;
}
