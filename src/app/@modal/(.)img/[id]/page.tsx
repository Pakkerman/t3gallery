import { getImage } from "~/server/db/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");

  const image = await getImage(idAsNumber);
  return (
    <div className="">
      <img src={image.url} alt={image.name} className="w-96 " />
    </div>
  );
}
