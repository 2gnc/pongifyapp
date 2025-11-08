import { MembersPage } from '@/fsd_pages/clubMembers';
import { getClubMembers } from '@/entities/club';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const members = await getClubMembers(id);

  return (
    <MembersPage members={members} tab={tab as  "admins" | "members" | "bans" | undefined} />
  );
}
