import { Hono } from "hono";
import { BASE_URL } from "../lib/constants";

const app = new Hono();

app.get("/", (c) => {
  const robotsTxt = ["User-agent: *", "Allow: /", "", `Sitemap: ${BASE_URL}/sitemap.xml`].join(
    "\n",
  );
  c.header("Content-Type", "text/plain; charset=utf-8");
  return c.body(robotsTxt);
});

export default app;
