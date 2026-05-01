import type { Child, JSX } from "hono/jsx";
import { c } from "./c";

export function Checkbox({
  id,
  label,
  invalid,
  error,
  required,
  class: custom,
  ...props
}: Omit<JSX.IntrinsicElements["input"], "type"> & {
  label?: Child;
  invalid?: boolean;
  error?: string;
}) {
  const isInvalid = invalid || Boolean(error);
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div class="flex flex-col gap-1">
      <label class="flex w-fit cursor-pointer items-center gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-50">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={isInvalid || undefined}
          aria-describedby={errorId}
          class={c("size-4", custom)}
          {...props}
        />
        {label ? (
          <span>
            {label}
            {required ? <span class="ml-1 text-destructive">*</span> : null}
          </span>
        ) : null}
      </label>
      {error ? (
        <p id={errorId} class="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckboxSample() {
  return (
    <div class="not-prose grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-3">
        <Checkbox id="checkbox-newsletter-sample" name="newsletter" label="Newsletter" />
        <Checkbox id="checkbox-terms-sample" name="terms" label="Accept terms" required />
        <Checkbox
          id="checkbox-error-sample"
          name="terms"
          label="Accept terms"
          invalid
          error="Accept terms."
        />
        <Checkbox id="checkbox-disabled-sample" label="Disabled" disabled />
      </div>

      <fieldset class="flex flex-col gap-2">
        <legend class="text-sm font-medium">Tags</legend>
        <Checkbox id="checkbox-tag-frontend-sample" name="tags" value="frontend" label="Frontend" />
        <Checkbox id="checkbox-tag-backend-sample" name="tags" value="backend" label="Backend" />
        <Checkbox id="checkbox-tag-infra-sample" name="tags" value="infra" label="Infra" />
      </fieldset>
    </div>
  );
}
