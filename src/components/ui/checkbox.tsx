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
    <div class="flex flex-col">
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
      <Checkbox id="check" name="check" label="Check" />
      <Checkbox
        id="required-error"
        name="terms"
        label="Accept terms"
        required
        invalid
        error="Please accept terms."
      />
      <Checkbox id="checkbox-disabled-sample" label="Disabled" disabled />
      <fieldset class="flex flex-col gap-1">
        <legend class="font-bold">Skills</legend>
        <Checkbox id="frontend" name="tags" value="frontend" label="Frontend" />
        <Checkbox id="backend" name="tags" value="backend" label="Backend" />
        <Checkbox id="infra" name="tags" value="infra" label="Infra" />
      </fieldset>
    </div>
  );
}
