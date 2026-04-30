import type { JSX } from "hono/jsx";
import { c } from "./c";
import { Button } from "./button";

export function Spinner({ class: custom, ...props }: JSX.IntrinsicElements["span"]) {
  return (
    <span
      class={c("inline-block size-5 animate-spin rounded-full border border-t-transparent", custom)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SpinnerSample() {
  return (
    <div class="not-prose flex flex-wrap items-center gap-4">
      <Spinner />
      <Spinner class="text-primary" />
      <Spinner class="size-6" />
      <Button type="submit" disabled>
        <Spinner />
      </Button>
    </div>
  );
}
