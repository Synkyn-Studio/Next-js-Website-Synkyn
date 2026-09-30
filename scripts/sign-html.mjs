/*
  Adds the Synkyn signature comment to the top and bottom of every prerendered
  page, so it is the first and last thing in view-source. React cannot render
  outside <html>, so this runs on the built files after `next build`.
*/

import fs from "node:fs";
import path from "node:path";

const SIGNATURE = `<!--
  Made by: Prajwal A B | Synkyn Studios
  © 2026 Synkyn Studios. All Rights Reserved.
-->`;

const DIRS = [".next/server/app", ".next/server/pages"];

const htmlFiles = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? htmlFiles(p) : e.name.endsWith(".html") ? [p] : [];
      })
    : [];

let signed = 0;
for (const file of DIRS.flatMap(htmlFiles)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.startsWith(SIGNATURE)) continue;
  html = `${SIGNATURE}\n${html.trimEnd()}\n${SIGNATURE}\n`;
  fs.writeFileSync(file, html);
  signed++;
}
console.log(`Signed ${signed} HTML page(s).`);
