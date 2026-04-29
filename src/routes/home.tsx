import { Hono } from "hono";
import { Faq, Hero, Info } from "../components/home";

const app = new Hono();

app.get("/", async (c) => {
  return c.render(
    <div class="flex flex-col gap-12">
      <Hero />
      <Info />
      <Faq />
    </div>,
    {
      metaData: { title: "Home" },
    },
  );
});

export default app;
