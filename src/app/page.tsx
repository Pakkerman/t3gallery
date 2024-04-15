import { db } from "~/server/db";

export const dynamic = "force-dynamic";
// force the data to update on the next visit

const mockUrls = [
  "https://utfs.io/f/28c9b1cb-4a9a-4ff8-9f3d-8888423238d1-1s10zr.jpeg",
  "https://utfs.io/f/0c9a84d9-c2b2-4f9e-a433-362c32a337bb-kh09eq.jpeg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <h1>Hello gallery (under construction)</h1>
      <div className="flex flex-wrap gap-4">
        {posts.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map(
          (item, index) => (
            <div key={index} className="w-48">
              <img src={item.url} alt={`image-${item.id}`} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
