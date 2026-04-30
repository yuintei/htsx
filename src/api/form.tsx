import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";

const app = new Hono();

const schema = z.object({
  text1: z.string().trim().min(2, "Text 1 must be at least 2 characters."),
  text2: z.string().trim().min(2, "Text 2 must be at least 2 characters."),
});

const submitRoute = app.post(
  "/submit",
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      return c.json(z.flattenError(result.error), 400);
    }
  }),
  async (c) => {
    // const { text1, text2 } = c.req.valid("json");
    // try {
    //   await db.insert(form).values({ text1, text2 });
    // } catch (e) {
    //   console.error("Failed:", e);
    //   return c.json({ message: "Failed" }, 503);
    // }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return c.json({ message: "ok" }, 200);
  },
);

export type SubmitApiType = typeof submitRoute;

export default app;
