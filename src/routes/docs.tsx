import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { ssgParams } from "hono/ssg";
import { raw } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
import { BASE_URL } from "../lib/constants";

type DocMeta = {
  title: string;
  description?: string;
  published: string;
  updated?: string;
};

const app = new Hono();

const mdxFiles = import.meta.glob<{ default: FC } & DocMeta>("/docs/**/*.{md,mdx}", {
  eager: true,
});

// docs renderer
app.get(
  "/:slug",
  jsxRenderer(({ children, Layout, metaData }, c) => {
    const title = metaData?.title ?? "";
    const description = metaData?.description ?? "";
    const published = metaData?.published ?? "";
    const updated = metaData?.updated ?? "";

    return (
      <Layout metaData={{ title, description, ogType: "article" }}>
        <script type="application/ld+json">
          {raw(
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description,
              image: [`${BASE_URL}/og.png`],
              datePublished: published || undefined,
              dateModified: updated || published || undefined,
              author: {
                "@type": "Organization",
                name: "htsx",
                url: BASE_URL,
              },
              publisher: {
                "@type": "Organization",
                name: "htsx",
                url: BASE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: `${BASE_URL}/logo.png`,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${BASE_URL}${c.req.path}`,
              },
              inLanguage: "en",
            }),
          )}
        </script>
        <article class="mx-auto prose max-w-3xl prose-neutral dark:prose-invert">
          <h1>{title}</h1>
          <p class="lead">{description}</p>
          {children}
          <div class="flex flex-col">
            <time datetime={published} class="text-end">
              {`Published: ${new Date(published).toLocaleDateString("ja-JP")}`}
            </time>
            {updated && (
              <time datetime={updated} class="text-end">
                {`Updated: ${new Date(updated).toLocaleDateString("ja-JP")}`}
              </time>
            )}
          </div>
        </article>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/copy.js" />
        ) : (
          <script type="module" src="/src/client/copy.tsx" />
        )}
      </Layout>
    );
  }),
);

// docs page
app.get(
  "/:slug",
  ssgParams(() =>
    Object.keys(mdxFiles).map((id) => ({
      slug: id.replace(/^\/docs\//, "").replace(/\.(md|mdx)$/, ""),
    })),
  ),
  (c) => {
    const slug = c.req.param("slug");
    const mod = mdxFiles[`/docs/${slug}.md`] ?? mdxFiles[`/docs/${slug}.mdx`];
    if (!mod) return c.notFound();
    const Content = mod.default;
    return c.render(<Content />, {
      metaData: {
        title: mod.title,
        description: mod.description,
        published: mod.published,
        updated: mod.updated,
      },
    });
  },
);

export default app;
