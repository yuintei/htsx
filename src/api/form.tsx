import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";

const app = new Hono();

const formSelectOptions = ["option-a", "option-b"] as const;

const formSchema = z.object({
  text: z.string().trim().min(2, "Text must be at least 2 characters."),
  select: z.enum(formSelectOptions, "Select an option."),
});

const submitRoute = app.post(
  "/submit",
  zValidator("json", formSchema, (result, c) => {
    if (!result.success) {
      return c.json(z.flattenError(result.error), 400);
    }
  }),
  async (c) => {
    // const { text, select } = c.req.valid("json");
    // try {
    //   await db.insert(form).values({ text, select });
    // } catch (e) {
    //   console.error("Failed:", e);
    //   return c.json({ message: "Failed" }, 503);
    // }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return c.json({ message: "ok" }, 200);
  },
);

export type SubmitApiType = typeof submitRoute;
export type FormSchemaType = z.infer<typeof formSchema>;

export default app;
