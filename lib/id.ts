import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
const nanoid = customAlphabet(alphabet, 8);

/**
 * Generates a short, URL-safe watch ID using a lowercase alphanumeric alphabet.
 *
 * @returns An 8-character random string, e.g. "a3k9mxqz"
 */
export function generateWatchId(): string {
  return nanoid();
}
