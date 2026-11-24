// Last Text at One Percent — the last text a dying phone sends.
// The message itself dies mid-word: the phone runs out of battery
// in the middle of the sentence. That is the joke.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Tell Mom I love her and the Wi-Fi password is on the frid\u2014";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    throw new Error("line must be a single non-blank line");
  }
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (bytes < 1 || bytes > 200) {
    throw new Error(`line must be 1-200 bytes, got ${bytes}`);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read back and confirm the file is byte-identical to the line:
  // the cut-off em dash is the joke, so a dropped or altered byte
  // would silently change the entry.
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt does not match the line byte for byte");
  }
}

main();
