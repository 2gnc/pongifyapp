import { getClubById } from "@/entities/club";
import { ClubDetails } from '@/features/club-details';

export default async function Page({ params }: { searchParams: Promise<Record<string, string>>; params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const club = await getClubById(id);

    return (
        <>
        <h1>single club</h1>
        <p>{JSON.stringify(id)}</p>
        <p>{JSON.stringify(club)}</p>
        <ClubDetails />
        </>
    )
}
