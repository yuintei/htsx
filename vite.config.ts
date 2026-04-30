import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import devServer from "@hono/vite-dev-server";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

const entry = "./src/index.ts";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [tailwindcss()],
      build: {
        rolldownOptions: {
          input: [
            "./src/style.css",
            "./src/client/copy.tsx",
            "./src/client/form.tsx",
            "./src/client/toast.tsx",
          ],
          output: {
            entryFileNames: "static/[name].js",
            chunkFileNames: "static/[name]-[hash].js",
            assetFileNames: "static/[name].[ext]",
          },
        },
        emptyOutDir: true,
        copyPublicDir: false,
      },
    };
  } else {
    return {
      plugins: [
        build({ entry }),
        devServer({ adapter, entry }),
        mdx({
          jsxImportSource: "hono/jsx",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: "catppuccin-frappe",
                  light: "catppuccin-latte",
                },
              },
            ],
          ],
        }),
        ssg({ entry }),
        tailwindcss(),
      ],
      build: {
        emptyOutDir: false,
      },
    };
  }
});
