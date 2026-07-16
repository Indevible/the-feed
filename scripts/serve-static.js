import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);

  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];

  return fallback;
}

const root = resolve(process.cwd(), getArg("root", "public"));
const port = Number(getArg("port", "4177"));

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  const cleanPath = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  const filePath = resolve(root, cleanPath || "index.html");

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    return null;
  }

  return filePath;
}

async function findFile(filePath) {
  const info = await stat(filePath).catch(() => null);
  if (!info) return null;
  if (info.isDirectory()) return join(filePath, "index.html");
  return filePath;
}

createServer(async (request, response) => {
  const requestPath = resolveRequestPath(request.url ?? "/");
  const filePath = requestPath ? await findFile(requestPath) : null;
  const fileInfo = filePath ? await stat(filePath).catch(() => null) : null;

  if (!filePath || !fileInfo?.isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  process.stdout.write(`Serving ${root} at http://localhost:${port}/the-feed/\n`);
});
