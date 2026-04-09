import { db } from "@/lib/db";
import { generateWatchId } from "@/lib/id";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { departure, arrival, flightNumber, date } = body as Record<string, unknown>;

  if (!departure || typeof departure !== "string" || departure.trim() === "") {
    return Response.json({ message: "Missing required field: departure" }, { status: 400 });
  }
  if (!arrival || typeof arrival !== "string" || arrival.trim() === "") {
    return Response.json({ message: "Missing required field: arrival" }, { status: 400 });
  }
  if (!flightNumber || typeof flightNumber !== "string" || flightNumber.trim() === "") {
    return Response.json({ message: "Missing required field: flightNumber" }, { status: 400 });
  }
  if (!date || typeof date !== "string" || date.trim() === "") {
    return Response.json({ message: "Missing required field: date" }, { status: 400 });
  }

  // TODO: tighten departure/arrival validation in Phase 3 once we standardize on IATA airport codes
  // Length limits
  if (departure.length > 100) {
    return Response.json({ message: "departure exceeds maximum length of 100" }, { status: 400 });
  }
  if (arrival.length > 100) {
    return Response.json({ message: "arrival exceeds maximum length of 100" }, { status: 400 });
  }
  if (flightNumber.length > 10) {
    return Response.json({ message: "flightNumber exceeds maximum length of 10" }, { status: 400 });
  }
  if (date.length > 20) {
    return Response.json({ message: "date exceeds maximum length of 20" }, { status: 400 });
  }

  // Flight number format
  if (!/^[A-Za-z0-9]{2,10}$/.test(flightNumber.trim())) {
    return Response.json({ message: "Invalid flight number format" }, { status: 400 });
  }

  // Date validation
  const parsed = new Date(date.trim());
  if (Number.isNaN(parsed.getTime())) {
    return Response.json({ message: "Invalid date" }, { status: 400 });
  }
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const oneYearAhead = new Date(now);
  oneYearAhead.setFullYear(now.getFullYear() + 1);
  if (parsed < oneYearAgo) {
    return Response.json({ message: "Date is too far in the past" }, { status: 400 });
  }
  if (parsed > oneYearAhead) {
    return Response.json({ message: "Date is too far in the future" }, { status: 400 });
  }

  const id = generateWatchId();
  const createdAt = new Date().toISOString();

  try {
    await db.execute({
      sql: "INSERT INTO flights (id, flight_number, origin, destination, date, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      args: [id, flightNumber.trim(), departure.trim(), arrival.trim(), date.trim(), createdAt],
    });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Database error" }, { status: 500 });
  }

  return Response.json({ id });
}
