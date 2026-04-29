import { Hono } from "hono";
import { getSortedDocs } from "../lib/docs";
import { STATIC_PAGES, BASE_URL } from "../lib/constants";

const app = new Hono();

function toLastmodDate(iso: string | null | undefined): string | null {
  return iso ? new Date(iso).toISOString().split("T")[0] : null;
}

app.get("/", async (c) => {
  const posts = getSortedDocs();
  const blogListLastmod = toLastmodDate(
    posts.reduce<string>((max, p) => {
      const t = p.updated ?? p.published ?? "";
      return t && t > max ? t : max;
    }, ""),
  );

  function staticPageLastmod(href: string): string | null {
    if (href === "/docs") return blogListLastmod;
    return null;
  }

  const staticXml = STATIC_PAGES.map((page) => {
    const lastmod = staticPageLastmod(page.href);
    return `<url>
    <loc>${BASE_URL}${page.href}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join("");

  const entriesXml = posts
    .map((post) => {
      const postLastmod = toLastmodDate(post.updated ?? post.published);
      return `<url>
    <loc>${BASE_URL}${post.url}</loc>
    ${postLastmod ? `<lastmod>${postLastmod}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticXml}
  ${entriesXml}
</urlset>`;

  c.header("Content-Type", "application/xml; charset=utf-8");
  return c.body(sitemapXml.trim());
});

export default app;
