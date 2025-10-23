import { ClubCreate } from '@/features/club-create';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    return (
        <ClubCreate />
    );
}
