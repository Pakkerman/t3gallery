import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {[
        ...images,
        ...images,
        ...images,
        ...images,
        ...images,
        ...images,
        ...images,
      ].map((item, index) => (
        <div key={index} className="w-48">
          <div className="flex flex-col">
            <img src={item.url} alt={`image-${item.id}`} />
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
