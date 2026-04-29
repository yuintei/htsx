import type { JSX, Child } from "hono/jsx";
import { c } from "./c";
import { Copy, ThumbsUp } from "./icons";

export function Button({
  type = "button",
  variant = "primary",
  class: custom,
  children,
  ...props
}: JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "secondary" | "outline" | "destructive";
  children?: Child;
}) {
  return (
    <button
      type={type}
      class={c(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition select-none hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border hover:bg-secondary": variant === "outline",
          "bg-destructive/20 text-destructive": variant === "destructive",
        },
        custom,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonSample() {
  return (
    <div class="not-prose flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
      <Button type="submit">Submit</Button>
      <Button variant="outline" class="p-2.5">
        <Copy />
      </Button>
      <Button variant="primary" class="gap-2">
        Like
        <ThumbsUp />
      </Button>
      <Button class="rounded-full bg-orange-400 px-8 font-bold text-white italic">Custom</Button>
    </div>
  );
}
