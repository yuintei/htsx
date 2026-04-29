// LLM クローラー向けのサイト概要ファイル（llmstxt.org 仕様）。
// ビルド時に SSG が dist/llms.txt として書き出す。
import { Hono } from "hono";
import { getSortedDocs } from "../lib/docs";
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/constants";

const app = new Hono();

app.get("/", (c) => {
  const docs = getSortedDocs();

  const ordered = [
    ...docs.filter((d) => d.url === "/docs/quickstart"),
    ...docs.filter((d) => d.url !== "/docs/quickstart"),
  ];

  const docLines = ordered.map((d) => {
    const desc = d.description ? `: ${d.description}` : "";
    return `- [${d.title}](${BASE_URL}${d.url})${desc}`;
  });

  const body = [`# ${SITE_NAME}`, "", `> ${SITE_DESCRIPTION}`, "", "## Docs", "", ...docLines].join(
    "\n",
  );

  c.header("Content-Type", "text/plain; charset=utf-8");
  return c.body(body);
});

export default app;
