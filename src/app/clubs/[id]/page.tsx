export default async function Page({ searchParams, params }: { searchParams: Promise<Record<string, string>>; params: Promise<{ id: string }>; }) {
    const { id } = await params;

    return (
        <>
        <h1>single club</h1>
        <p>{JSON.stringify(id)}</p>
        </>
    )
}
