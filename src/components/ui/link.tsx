import type { Child, JSX } from "hono/jsx";
import { c } from "./c";
import { ExternalLink } from "./icons";

export function Link({
  variant = "text",
  class: custom,
  children,
  ...props
}: Omit<JSX.IntrinsicElements["a"], "href"> & {
  href: string;
  variant?: "text" | "underline" | "muted" | "buttonPrimary" | "buttonSecondary" | "buttonOutline";
  children?: Child;
}) {
  const buttonStyle =
    variant === "buttonPrimary" || variant === "buttonSecondary" || variant === "buttonOutline";

  return (
    <a
      class={c(
        "inline-flex items-center transition hover:opacity-80 active:opacity-70",
        {
          "font-medium text-primary underline-offset-4 hover:underline": variant === "text",
          "font-medium text-primary underline underline-offset-4": variant === "underline",
          "font-medium text-muted-foreground underline-offset-4 hover:underline":
            variant === "muted",
        },
        buttonStyle &&
          "shrink-0 justify-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap select-none",
        {
          "bg-primary text-primary-foreground": variant === "buttonPrimary",
          "bg-secondary text-secondary-foreground": variant === "buttonSecondary",
          "border border-border hover:bg-secondary": variant === "buttonOutline",
        },
        custom,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function LinkSample() {
  return (
    <div class="not-prose flex flex-wrap items-center gap-4">
      <Link href="/docs/link">Text</Link>
      <Link href="/docs/link" variant="underline">
        Underline
      </Link>
      <Link href="/docs/link" variant="muted">
        Muted
      </Link>
      <Link
        href="https://github.com/yuintei/htsx"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center gap-1"
      >
        With icon
        <ExternalLink />
      </Link>

      <Link href="/docs/link" variant="buttonPrimary">
        Primary
      </Link>
      <Link href="/docs/link" variant="buttonSecondary">
        Secondary
      </Link>
      <Link href="/docs/link" variant="buttonOutline">
        Outline
      </Link>
      <Link
        href="https://github.com/yuintei/htsx"
        variant="buttonPrimary"
        target="_blank"
        rel="noreferrer"
        class="gap-2"
      >
        With icon
        <ExternalLink />
      </Link>
    </div>
  );
}
