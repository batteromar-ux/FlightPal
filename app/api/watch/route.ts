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

  const id = generateWatchId();
  const createdAt = new Date().toISOString();

  try {
    await db.execute({
      sql: "INSERT INTO flights (id, flight_number, origin, destination, date, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      args: [id, flightNumber, departure, arrival, date, createdAt],
    });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Database error" }, { status: 500 });
  }

  return Response.json({ id });
}
