"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departure, arrival, flightNumber, date }),
      });
      if (!response.ok) {
        throw new Error("Failed to create watch link");
      }
      const data = await response.json();
      router.push("/w/" + data.id);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 px-4 py-16">
      <h1 className="text-6xl font-bold text-white">FlightPal</h1>

      <p className="text-lg text-zinc-400">
        Share a link. Watch a flight. No signup.
      </p>

      <div className="w-[400px] h-[200px] bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600">
        ✈️ GIF placeholder
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col gap-4">
        <input
          type="text"
          placeholder="Departing airport"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="w-full bg-zinc-900 text-white rounded-lg px-4 py-3 placeholder:text-zinc-500 outline-none"
        />
        <input
          type="text"
          placeholder="Arriving airport"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="w-full bg-zinc-900 text-white rounded-lg px-4 py-3 placeholder:text-zinc-500 outline-none"
        />
        <input
          type="text"
          placeholder="Flight number (e.g. AA100)"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          className="w-full bg-zinc-900 text-white rounded-lg px-4 py-3 placeholder:text-zinc-500 outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-zinc-900 text-white rounded-lg px-4 py-3 outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black rounded-lg py-3 font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Watch Link"}
        </button>
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
