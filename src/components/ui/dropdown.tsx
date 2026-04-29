import type { Child, JSX } from "hono/jsx";
import { Button } from "./button";
import { c } from "./c";
import { ChevronRight } from "./icons";

export function Dropdown({
  id,
  side = "bottom",
  align = "start",
  popover = "auto",
  class: custom,
  children,
  ...props
}: JSX.IntrinsicElements["div"] & {
  id: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children?: Child;
}) {
  const vertical = side === "top" || side === "bottom";
  const horizontal = side === "right" || side === "left";

  return (
    <div
      id={id}
      popover={popover}
      class={c(
        "inset-auto rounded-md border border-border bg-card p-1 text-card-foreground shadow-md",
        {
          "bottom-[anchor(top)] mb-1": side === "top",
          "left-[anchor(right)] ml-1": side === "right",
          "top-[anchor(bottom)] mt-1": side === "bottom",
          "right-[anchor(left)] mr-1": side === "left",
        },
        {
          "left-[anchor(left)]": vertical && align === "start",
          "left-[anchor(center)] -translate-x-1/2": vertical && align === "center",
          "right-[anchor(right)]": vertical && align === "end",
          "top-[anchor(top)]": horizontal && align === "start",
          "top-[anchor(center)] -translate-y-1/2": horizontal && align === "center",
          "bottom-[anchor(bottom)]": horizontal && align === "end",
        },
        custom,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownSample() {
  return (
    <div class="not-prose flex flex-col gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <Button popovertarget="dropdown-menu-sample">Menu</Button>
        <Dropdown id="dropdown-menu-sample">
          <div class="flex flex-col">
            <a href="/" class="rounded px-3 py-2 text-sm hover:bg-secondary">
              Home
            </a>
            <a href="/docs/button" class="rounded px-3 py-2 text-sm hover:bg-secondary">
              Button
            </a>
            <button
              type="button"
              popovertarget="dropdown-menu-sample"
              popovertargetaction="hide"
              class="rounded px-3 py-2 text-left text-sm hover:bg-secondary"
            >
              Close
            </button>
          </div>
        </Dropdown>

        <Button popovertarget="dropdown-actions-sample" variant="outline">
          Actions
        </Button>
        <Dropdown id="dropdown-actions-sample" align="end">
          <div class="flex flex-col">
            <button
              type="button"
              popovertarget="dropdown-actions-sample"
              popovertargetaction="hide"
              onclick="alert('Archived')"
              class="rounded px-3 py-2 text-left text-sm hover:bg-secondary"
            >
              Archive
            </button>
            <button
              type="button"
              popovertarget="dropdown-actions-sample"
              popovertargetaction="hide"
              onclick="alert('Duplicated')"
              class="rounded px-3 py-2 text-left text-sm hover:bg-secondary"
            >
              Duplicate
            </button>
            <button
              type="button"
              popovertarget="dropdown-actions-sample"
              popovertargetaction="hide"
              class="rounded px-3 py-2 text-left text-sm text-destructive hover:bg-secondary"
            >
              Delete
            </button>
          </div>
        </Dropdown>

        <Button popovertarget="dropdown-custom-sample" variant="outline">
          Nested
        </Button>
        <Dropdown id="dropdown-custom-sample" side="bottom">
          <button
            type="button"
            popovertarget="dropdown-custom-nested-sample"
            class="w-full rounded px-3 py-2 text-left text-sm hover:bg-secondary"
          >
            <div class="flex items-center justify-between">
              <span>Open Nested</span>
              <ChevronRight />
            </div>
          </button>
          <button
            type="button"
            popovertarget="dropdown-custom-sample"
            popovertargetaction="hide"
            class="w-full rounded px-3 py-2 text-left text-sm hover:bg-secondary"
          >
            Close
          </button>
          <Dropdown id="dropdown-custom-nested-sample" side="right" align="center">
            <button
              type="button"
              popovertarget="dropdown-custom-sample"
              popovertargetaction="hide"
              class="w-full rounded px-3 py-2 text-left text-sm hover:bg-secondary"
            >
              Nested
            </button>
          </Dropdown>
        </Dropdown>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <Button popovertarget="dropdown-align-start-sample" variant="secondary">
          Start
        </Button>
        <Dropdown id="dropdown-align-start-sample" align="start">
          <p class="px-3 py-2 text-sm">Aligned to start</p>
        </Dropdown>

        <Button popovertarget="dropdown-align-center-sample" variant="secondary">
          Center
        </Button>
        <Dropdown id="dropdown-align-center-sample" align="center">
          <p class="px-3 py-2 text-sm">Aligned to center</p>
        </Dropdown>

        <Button popovertarget="dropdown-align-end-sample" variant="secondary">
          End
        </Button>
        <Dropdown id="dropdown-align-end-sample" align="end">
          <p class="px-3 py-2 text-sm">Aligned to end</p>
        </Dropdown>

        <Button popovertarget="dropdown-side-top-sample" variant="outline">
          Top
        </Button>
        <Button popovertarget="dropdown-side-right-sample" variant="outline">
          Right
        </Button>
        <Button popovertarget="dropdown-side-left-sample" variant="outline">
          Left
        </Button>
        <Button popovertarget="dropdown-side-bottom-sample" variant="outline">
          Bottom
        </Button>

        <Dropdown id="dropdown-side-top-sample" side="top" align="center">
          <p class="px-3 py-2 text-sm">Top side</p>
        </Dropdown>
        <Dropdown id="dropdown-side-right-sample" side="right" align="center">
          <p class="px-3 py-2 text-sm">Right side</p>
        </Dropdown>
        <Dropdown id="dropdown-side-bottom-sample" side="bottom" align="center">
          <p class="px-3 py-2 text-sm">Bottom side</p>
        </Dropdown>
        <Dropdown id="dropdown-side-left-sample" side="left" align="center">
          <p class="px-3 py-2 text-sm">Left side</p>
        </Dropdown>
      </div>
    </div>
  );
}
