export async function writeStdout(events) {
  process.stdout.write(`${JSON.stringify(events, null, 2)}\n`);
}

export async function writeJsonLines(events) {
  for (const event of events) {
    process.stdout.write(`${JSON.stringify(event)}\n`);
  }
}
