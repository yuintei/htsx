import { Hono } from "hono";
import { Faq, Hero, Info } from "../components/home";
import { List } from "../components/list";

const app = new Hono();

app.get("/", async (c) => {
  return c.render(
    <div class="flex flex-col gap-12">
      <Hero />
      <Info />
      <Faq />
      <h2 class="-mb-4 text-3xl font-bold">Components</h2>
      <List />
    </div>,
    {
      metaData: { title: "Home" },
    },
  );
});

export default app;
