
import { getClubById, getClubMembers } from '@/entities/club';
import { getUserFromCookies, getUserById } from '@/entities/user';
import { ClubDetails } from '@/features/club-details';

export default async function Page({ params }: { searchParams: Promise<Record<string, string>>; params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const club = await getClubById(id);
    const members = await getClubMembers(id);
    const currentUser = await getUserFromCookies();
    
    if (!club || !currentUser) return null;
    const owner = await getUserById(club.ownerId);

    return (
        <>
            <ClubDetails club={club} currentUser={currentUser} owner={owner} />
        </>
    )
}
