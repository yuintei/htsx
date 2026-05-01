import type { JSX } from "hono/jsx";
import { c } from "./c";

export function Input({
  id,
  label,
  invalid,
  error,
  required,
  class: custom,
  ...props
}: JSX.IntrinsicElements["input"] & {
  label?: string;
  invalid?: boolean;
  error?: string;
}) {
  const isInvalid = invalid || Boolean(error);
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div class="flex w-full flex-col gap-1">
      {label ? (
        <label for={id} class="text-sm font-medium">
          {label}
          {required ? <span class="ml-1 text-destructive">*</span> : null}
        </label>
      ) : null}
      <input
        id={id}
        required={required}
        aria-invalid={isInvalid || undefined}
        aria-describedby={errorId}
        class={c(
          "h-10 w-full rounded-md border border-input px-3 py-2 text-sm transition placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-muted",
          {
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30":
              isInvalid,
          },
          custom,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} class="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InputSample() {
  return (
    <div class="not-prose grid grid-cols-2 gap-4 md:grid-cols-3">
      <Input id="email" type="email" label="Email" placeholder="you@example.com" />
      <Input id="password" type="password" label="Password" placeholder="••••••••" />
      <Input
        id="error"
        type="email"
        label="Email"
        name="email"
        value="invalid"
        invalid
        required
        error="Enter a valid email."
      />
      <Input id="disabled" label="Disabled" placeholder="Disabled" disabled />
    </div>
  );
}
