"use client";

import { useState } from "react";

export default function Home() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 px-4 py-16">
      <h1 className="text-6xl font-bold text-white">FlightPal</h1>

      <p className="text-lg text-zinc-400">
        Share a link. Watch a flight. No signup.
      </p>

      <div className="w-[400px] h-[200px] bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600">
        ✈️ GIF placeholder
      </div>

      <form className="w-full max-w-[400px] flex flex-col gap-4">
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
          className="w-full bg-white text-black rounded-lg py-3 font-semibold hover:bg-zinc-200 transition-colors"
        >
          Create Watch Link
        </button>
      </form>
    </div>
  );
}
