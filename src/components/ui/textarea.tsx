import type { JSX } from "hono/jsx";
import { c } from "./c";

export function Textarea({
  id,
  label,
  invalid,
  error,
  required,
  class: custom,
  ...props
}: JSX.IntrinsicElements["textarea"] & {
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
      <textarea
        id={id}
        required={required}
        aria-invalid={isInvalid || undefined}
        aria-describedby={errorId}
        class={c(
          "w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm transition placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-muted",
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

export function TextareaSample() {
  return (
    <div class="not-prose grid gap-4 md:grid-cols-2">
      <Textarea id="bio" name="bio" label="Bio" rows={3} placeholder="Tell us about yourself..." />
      <Textarea
        id="textarea-error"
        name="comment"
        label="Comment"
        value="Too short"
        invalid
        required
        error="Comment must be at least 20 characters."
      />
      <Textarea
        id="textarea-fixed"
        name="notes"
        label="Fixed size"
        class="resize-none"
        placeholder="Resize is disabled."
      />
      <Textarea id="textarea-disabled" label="Disabled" placeholder="Disabled" disabled />
    </div>
  );
}
