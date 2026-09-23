/*
  Route-scoped CSS.

  Each static page carried its own <style> blocks (theme variants, page layout
  CSS) that conflict with one another — e.g. one page sets `overflow-x: clip`
  on html/body, another `hidden`. Next.js keeps route CSS imports alive after
  client-side navigation, so importing these would leak one page's rules into
  the next. Instead they are inlined as an in-tree <style> element that React
  removes when the route unmounts, preserving the original cascade per page.

  The files are read at build time (every route is statically prerendered).
*/

import fs from "node:fs";
import path from "node:path";

const STYLES_DIR = path.join(process.cwd(), "src", "styles");
const cache = new Map<string, string>();

function read(file: string) {
  let css = cache.get(file);
  if (css === undefined) {
    css = fs.readFileSync(path.join(STYLES_DIR, file), "utf8");
    if (process.env.NODE_ENV === "production") cache.set(file, css);
  }
  return css;
}

export default function PageStyle({ id, files }: { id: string; files: string[] }) {
  const css = files.map((f) => `/* ${f} */\n${read(f)}`).join("\n");
  return <style id={`page-style-${id}`} dangerouslySetInnerHTML={{ __html: css }} />;
}
