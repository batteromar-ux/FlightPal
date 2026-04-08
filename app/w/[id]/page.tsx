export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold text-white">FlightPal</h1>
      <div className="bg-zinc-900 rounded-xl p-8 max-w-md w-full">
        <p className="text-zinc-400 text-sm">Watching flight</p>
        <p className="text-4xl font-bold text-white mt-1">{id}</p>
        <div className="border-t border-zinc-800 my-6" />
        <p className="text-zinc-500">Flight status will appear here</p>
      </div>
    </main>
  );
}
