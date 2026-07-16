import { readFile } from "node:fs/promises";

export async function readFixtureEvents(path) {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw);
}
