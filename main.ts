import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Day 1: spend $12 on a domain; code 10 printable wedding seating-chart templates, list each at $9 on Etsy. Days 2-30: post one free sample daily in r/weddingplanning and on Pinterest, answer buyers in minutes, reinvest profit in $3/day Etsy ads. 50 sales = $450 gross, ~$290 kept.";

const count = [...TEXT].length;
if (count < 1 || count > 280) {
  console.error(`entry must be 1-280 Unicode code points, got ${count}`);
  process.exit(1);
}
if (TEXT.trim().length === 0) {
  console.error("entry must not be only whitespace");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

const bytes = Buffer.from(TEXT, "utf8");
const sha256 = createHash("sha256").update(bytes).digest("hex");
console.log(`chars: ${count}`);
console.log(`sha256: ${sha256}`);
console.log(`wrote: ${outPath}`);
