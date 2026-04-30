import { html, raw } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
import Footer from "./footer";
import Header from "./header";
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from "../lib/constants";

export default jsxRenderer(({ children, metaData }, c) => {
  const ogTitle = metaData?.title ? `${metaData.title} - ${SITE_NAME}` : SITE_NAME;
  const ogDescription = metaData?.description || `${SITE_NAME} - ${SITE_DESCRIPTION}`;
  const ogUrl = `${BASE_URL}${c.req.path}`;
  const ogType = metaData?.ogType || "website";
  const ogImage = `${BASE_URL}/og.png`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <title>{ogTitle}</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="theme-color" content="#fafafa" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={ogUrl} />
        <script type="application/ld+json">
          {raw(
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: BASE_URL,
            }),
          )}
        </script>
        {import.meta.env.PROD ? (
          <link rel="stylesheet" href="/static/style.css" />
        ) : (
          <link rel="stylesheet" href="/src/style.css" />
        )}
        {html`
          <script>
            document.documentElement.classList.toggle("dark", localStorage.theme !== "light");
          </script>
          <script type="module">
            document.getElementById("theme-toggle").addEventListener("click", () => {
              localStorage.theme = document.documentElement.classList.toggle("dark") ? "dark" : "light";
            });
          </script>
        `}
      </head>
      <body class="mx-auto flex min-h-svh max-w-6xl flex-col bg-background px-4 text-foreground antialiased">
        <Header />
        <main class="my-8 grow">{children}</main>
        <div id="toast-root"></div>
        <Footer />
      </body>
    </html>
  );
});
