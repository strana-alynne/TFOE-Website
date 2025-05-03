import MembersProfile from "./content";

export default async function MembersProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MembersProfile memberId={id} />;
}
