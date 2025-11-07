import { EventCreatePage } from '@/fsd_pages/eventCreate';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    return (
        <EventCreatePage />
    )
}
