import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CopyLinkButton from "./CopyLinkButton";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await db.execute({
    sql: "SELECT * FROM flights WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) {
    notFound();
  }

  const flight = result.rows[0];

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold text-white">FlightPal</h1>
      <div className="bg-zinc-900 rounded-xl p-8 max-w-md w-full">
        <p className="text-zinc-400 text-sm">Flight</p>
        <p className="text-4xl font-bold text-white mt-1">{flight.flight_number as string}</p>
        <div className="border-t border-zinc-800 my-6" />
        <p className="text-zinc-300 text-lg">{flight.origin as string} → {flight.destination as string}</p>
        <p className="text-zinc-500 text-sm mt-2">Date: {flight.date as string}</p>
      </div>
      <CopyLinkButton />
    </main>
  );
}
