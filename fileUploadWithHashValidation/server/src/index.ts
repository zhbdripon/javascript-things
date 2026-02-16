import { serve } from "@hono/node-server";
import Busboy from "busboy";
import "dotenv/config";
import { sql } from "drizzle-orm";
import { createReadStream, statSync } from "fs";
import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";
import path from "path";
import { db } from "./db/index.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "X-File-Hash"],
  }),
);

app.get("/", (c) => c.json({ message: "Hello from Hono" }));

app.get("/db-health", async (c) => {
  await db.execute(sql`select 1`);
  return c.json({ ok: true });
});

app.post("/upload", async (c) => {
  const req = c.req.raw;
  // Expected SHA-256 hash sent by the client for integrity verification.
  const expectedHash = c.req.header("x-file-hash");

  // Require the hash header to validate uploads.
  if (!expectedHash) {
    return c.json({ error: "Missing X-File-Hash header" }, 400);
  }

  const headers = Object.fromEntries(req.headers.entries());
  const busboy = Busboy({ headers });

  const uploadDir = path.resolve("./uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  if (!req.body) {
    return c.json({ error: "No request body" }, 400);
  }

  return new Promise<Response>((resolve, reject) => {
    let savedFilename = "";
    // Promise that resolves only after the file hash is validated.
    let filePromise: Promise<void> | null = null;

    busboy.on("file", (fieldname, file, info) => {
      console.log(`Receiving file: ${info.filename} (${fieldname})`);
      // Create a unique filename and prepare a write stream.
      const filename = Date.now() + "-" + info.filename;
      savedFilename = filename;

      const filepath = path.join(uploadDir, filename);
      const writeStream = fs.createWriteStream(filepath);

      // Stream the upload while computing its SHA-256 hash.
      const hash = createHash("sha256");
      file.on("data", (chunk) => {
        console.log(`Received chunk: ${chunk.length} bytes`);
        hash.update(chunk);
      });

      // Validate the hash after the upload completes.
      filePromise = new Promise((fileResolve, fileReject) => {
        // Delete the partial file if validation fails.
        const fail = async (message: string) => {
          await fs.promises.unlink(filepath).catch(() => undefined);
          fileReject(new Error(message));
        };

        // Propagate stream errors.
        file.on("error", fileReject);
        writeStream.on("error", fileReject);

        // Compare the computed hash with the expected value.
        file.on("end", () => {
          const digest = hash.digest("hex");
          if (digest !== expectedHash) {
            void fail("Invalid file hash");
            return;
          }
          fileResolve();
        });
      });

      // Persist the upload to disk.
      file.pipe(writeStream);
    });

    busboy.on("finish", () => {
      // Reject if no file field was present.
      if (!filePromise) {
        resolve(c.json({ error: "No file uploaded" }, 400));
        return;
      }

      // Wait for hash validation before responding.
      filePromise
        .then(() => resolve(c.json({ filename: savedFilename })))
        .catch((error) =>
          resolve(
            c.json(
              {
                error: error instanceof Error ? error.message : "Upload failed",
              },
              400,
            ),
          ),
        );
    });

    // Reject malformed multipart requests.
    busboy.on("error", reject);

    // Pipe the raw request into busboy.
    const nodeStream = Readable.fromWeb(req.body);
    nodeStream.pipe(busboy);
  });
});

app.get("/stream/:filename", async (c) => {
  const filename = c.req.param("filename");
  const filepath = path.join("./uploads", filename);

  const stat = statSync(filepath);
  const fileSize = stat.size;

  const range = c.req.header("range");

  if (!range) {
    return c.text("Range header required", 400);
  }

  const start = Number(range.replace(/\D/g, ""));
  const CHUNK_SIZE = 1 * 1024 * 1024;

  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const stream = createReadStream(filepath, { start, end });

  return new Response(stream as any, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": String(end - start + 1),
      "Content-Type": "video/mp4",
    },
  });
});

app.get("/download/:name", (c) => {
  const filename = c.req.param("name");
  const filepath = path.join("uploads", filename);

  const stream = createReadStream(filepath);

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});

const port = 3000;

serve({ fetch: app.fetch, port });

console.log(`Server running on http://localhost:${port}`);
