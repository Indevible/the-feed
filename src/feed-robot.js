import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { writeJsonLinesFile, writeLatestJson } from "./adapters/file-adapter.js";
import { writeJsonLines, writeStdout } from "./adapters/stdout-adapter.js";
import { normalizeRawEvent } from "./normalize.js";
import { readFixtureEvents } from "./providers/fixture-provider.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);

  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];

  return fallback;
}

function resolvePath(path) {
  return isAbsolute(path) ? path : resolve(rootDir, path);
}

async function readLexicon(lexiconPath) {
  return JSON.parse(await readFile(resolvePath(lexiconPath), "utf8"));
}

async function readRawEvents(provider) {
  if (provider !== "fixture") {
    throw new Error(`Unsupported provider for first brick: ${provider}`);
  }

  return readFixtureEvents(resolve(rootDir, "fixtures", "raw-events.json"));
}

async function main() {
  const provider = getArg("provider", "fixture");
  const output = getArg("output", "stdout");
  const outputPath = getArg("output-path", "public/events/latest.json");
  const lexiconPath = getArg(
    "lexicon-path",
    process.env.SENDSPEAK_LEXICON_PATH ?? "../sendspeak/l0/lexicons/lexicon-0.json"
  );
  const lexicon = await readLexicon(lexiconPath);
  const rawEvents = await readRawEvents(provider);
  const events = rawEvents.map((rawEvent) => normalizeRawEvent(rawEvent, lexicon));

  if (output === "latest-json") {
    await writeLatestJson(events, resolve(rootDir, outputPath));
    return;
  }

  if (output === "jsonl-file") {
    await writeJsonLinesFile(events, resolve(rootDir, outputPath));
    return;
  }

  if (output === "jsonl") {
    await writeJsonLines(events);
    return;
  }

  await writeStdout(events);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
