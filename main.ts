// Say What Actually Broke — make.fun entry (program/v1, node22).
//
// Writes one line of error copy to /output/entry.txt: the brutal truth
// about a single everyday failure, told dryly, with the next step attached.
// Fully deterministic: no clock, no randomness, no network, no environment
// reads — the same constant is written on every run, byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";

// One failure, named plainly: the site's TLS certificate lapsed at
// midnight, so the browser now treats a familiar site as a stranger.
// The renewal is already under way; the user just retries in a few minutes.
// (The em dash is one character under the gate's 200-character count.)
const ENTRY =
  "Our certificate expired at midnight, so your browser thinks we're impostors. Renewal in progress — try again in five minutes.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, on a single line. Fail loudly rather than ship a bad file.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (/[\r\n]/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file's bytes are exactly the line itself.
writeFileSync("/output/entry.txt", ENTRY, "utf8");
