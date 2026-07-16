import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { SCHEMA_VERSION } from "../constants.js";

async function ensureParent(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

export async function writeLatestJson(events, filePath) {
  await ensureParent(filePath);
  await writeFile(
    filePath,
    `${JSON.stringify(
      {
        schema_version: SCHEMA_VERSION,
        generated_at: new Date().toISOString(),
        event_count: events.length,
        events
      },
      null,
      2
    )}\n`,
    "utf8"
  );
}

export async function writeJsonLinesFile(events, filePath) {
  await ensureParent(filePath);
  await writeFile(filePath, `${events.map((event) => JSON.stringify(event)).join("\n")}\n`, "utf8");
}
