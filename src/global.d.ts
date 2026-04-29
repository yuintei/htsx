import type {} from "hono";

type Head = {
  metaData?: {
    title?: string;
    description?: string;
    ogType?: string;
    published?: string;
    updated?: string;
  };
};

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: Cloudflare.Env;
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>;
  }
}
