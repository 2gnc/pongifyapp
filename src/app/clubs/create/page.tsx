import { ClubCreate } from '@/fsd_pages/clubCreate';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    return (
        <ClubCreate />
    );
}
