import FullPageImageView from "~/app/components/full-image-page";

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <FullPageImageView photoId={photoId} />;
}
