// Server-only: this module must never be imported in browser/client-side code.

import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("Missing environment variable: TURSO_DATABASE_URL");
}
if (!authToken) {
  throw new Error("Missing environment variable: TURSO_AUTH_TOKEN");
}

export const db = createClient({ url, authToken });
