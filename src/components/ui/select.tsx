import type { Child, JSX } from "hono/jsx";
import { c } from "./c";

export function Select({
  id,
  label,
  invalid,
  error,
  required,
  class: custom,
  children,
  ...props
}: Omit<JSX.IntrinsicElements["select"], "multiple" | "size"> & {
  label?: string;
  invalid?: boolean;
  error?: string;
  children?: Child;
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
      <select
        id={id}
        required={required}
        aria-invalid={isInvalid || undefined}
        aria-describedby={errorId}
        class={c(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 dark:bg-muted",
          {
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30":
              isInvalid,
          },
          custom,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} class="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectSample() {
  return (
    <div class="not-prose grid grid-cols-2 gap-4 md:grid-cols-3">
      <Select id="select-theme-sample" name="theme" label="Theme">
        <option value="system" selected>
          System
        </option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
      <Select id="select-country-sample" name="country" label="Country" required>
        <option value="" selected>
          Select a country
        </option>
        <option value="jp">Japan</option>
        <option value="us">United States</option>
      </Select>
      <Select id="select-timezone-sample" name="timezone" label="Timezone">
        <option value="" selected>
          Select a timezone
        </option>
        <optgroup label="Asia">
          <option value="asia-tokyo">Tokyo</option>
          <option value="asia-seoul">Seoul</option>
        </optgroup>
        <optgroup label="America">
          <option value="america-new-york">New York</option>
          <option value="america-los-angeles">Los Angeles</option>
        </optgroup>
      </Select>
      <Select id="select-disabled-sample" label="Disabled" disabled>
        <option>Disabled</option>
      </Select>
      <Select id="select-error-sample" label="Role" invalid error="Select a role." required>
        <option value="" selected>
          Select a role
        </option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
      </Select>
    </div>
  );
}
