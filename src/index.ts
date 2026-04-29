import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import renderer from "./components/renderer";
import home from "./routes/home";
import docs from "./routes/docs";
import llms from "./routes/llms";
import robots from "./routes/robots";
import sitemap from "./routes/sitemap";

const app = new Hono();

// renderer
app.use("*", renderer);

// routes
app.route("/", home);
app.route("/docs", docs);

// utils
app.route("/llms.txt", llms);
app.route("/robots.txt", robots);
app.route("/sitemap.xml", sitemap);

// errors
app.notFound((c) => c.text("404 NOT FOUND", 404));

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return e.getResponse();
  }
  console.error(e);
  return c.text("500 INTERNAL SERVER ERROR", 500);
});

export default app;
