export default async function Page({ searchParams, params }: { searchParams: Promise<Record<string, string>>; params: { id: string }; }) {
    return (
        <>
        <h1>single club</h1>
        <p>{JSON.stringify(params.id)}</p>
        </>
    )
}
