import type { Child, JSX } from "hono/jsx";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { c } from "./ui/c";
import { ChevronRight, Copy, ExternalLink, ThumbsUp } from "./ui/icons";
import { Link } from "./ui/link";
import { Popover } from "./ui/popover";
import { Tab } from "./ui/tab";
import { Dropdown } from "./ui/dropdown";

function Box({
  title,
  href,
  class: custom,
  children,
  ...props
}: JSX.IntrinsicElements["div"] & {
  title: string;
  href: string;
  children: Child;
}) {
  return (
    <div class="flex flex-col gap-1">
      <Link href={href} variant="underline">
        <h3 class="font-bold">{title}</h3>
      </Link>
      <div class={c("flex w-full min-w-0 rounded-md border border-border p-4", custom)} {...props}>
        {children}
      </div>
    </div>
  );
}

export function List() {
  return (
    <div class="not-prose grid w-full items-start gap-4 md:grid-cols-2">
      <Box title="Accordion" href="/docs/accordion">
        <Accordion
          class="text-xs"
          defaultOpen={["q2"]}
          items={[
            {
              value: "q1",
              title: "What is this?",
              content: "According component for htsx.",
            },
            {
              value: "q2",
              title: "Does it need JavaScript?",
              content: "No. Powered by <details>/<summary> only.",
            },
          ]}
        />
      </Box>
      <Box title="Button" href="/docs/button">
        <div class="flex flex-wrap items-center gap-2">
          <Button variant="primary" class="px-2 py-1 text-xs">
            Primary
          </Button>
          <Button variant="secondary" class="px-2 py-1 text-xs">
            Secondary
          </Button>
          <Button variant="outline" class="px-2 py-1 text-xs">
            Outline
          </Button>
          <Button variant="destructive" class="px-2 py-1 text-xs">
            Destructive
          </Button>
          <Button disabled class="px-2 py-1 text-xs">
            Disabled
          </Button>
          <Button type="submit" class="px-2 py-1 text-xs">
            Submit
          </Button>
          <Button variant="outline" class="p-1.5">
            <span class="[&>svg]:size-3">
              <Copy />
            </span>
          </Button>
          <Button variant="primary" class="gap-1 px-2 py-1 text-xs">
            Like
            <span class="[&>svg]:size-3">
              <ThumbsUp />
            </span>
          </Button>
          <Button
            variant="outline"
            class="rounded-full border border-primary px-2 py-1 text-xs font-bold text-primary italic"
          >
            Custom
          </Button>
        </div>
      </Box>
      <Box title="Dropdown" href="/docs/dropdown">
        <div class="not-prose flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <Button
              popovertarget="dropdown-menu-sample"
              variant="outline"
              class="px-2 py-1 text-xs"
            >
              Menu
            </Button>
            <Dropdown id="dropdown-menu-sample">
              <div class="flex flex-col">
                <a href="/" class="rounded px-3 py-2 text-sm hover:bg-accent">
                  Home
                </a>
                <a href="/docs/button" class="rounded px-3 py-2 text-sm hover:bg-accent">
                  Button
                </a>
                <button
                  type="button"
                  popovertarget="dropdown-menu-sample"
                  popovertargetaction="hide"
                  class="rounded px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Close
                </button>
              </div>
            </Dropdown>

            <Button popovertarget="dropdown-actions-sample" class="px-2 py-1 text-xs">
              Actions
            </Button>
            <Dropdown id="dropdown-actions-sample" align="end">
              <div class="flex flex-col">
                <button
                  type="button"
                  popovertarget="dropdown-actions-sample"
                  popovertargetaction="hide"
                  onclick="alert('Archived')"
                  class="rounded px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Archive
                </button>
                <button
                  type="button"
                  popovertarget="dropdown-actions-sample"
                  popovertargetaction="hide"
                  onclick="alert('Duplicated')"
                  class="rounded px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  popovertarget="dropdown-actions-sample"
                  popovertargetaction="hide"
                  class="rounded px-3 py-2 text-left text-sm text-destructive hover:bg-accent"
                >
                  Delete
                </button>
              </div>
            </Dropdown>

            <Button
              popovertarget="dropdown-custom-sample"
              class="px-2 py-1 text-xs"
              variant="secondary"
            >
              Nested
            </Button>
            <Dropdown id="dropdown-custom-sample" side="bottom">
              <button
                type="button"
                popovertarget="dropdown-custom-nested-sample"
                class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
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
                class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
              >
                Close
              </button>
              <Dropdown id="dropdown-custom-nested-sample" side="right" align="center">
                <button
                  type="button"
                  popovertarget="dropdown-custom-sample"
                  popovertargetaction="hide"
                  class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Nested
                </button>
              </Dropdown>
            </Dropdown>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <Button
              popovertarget="dropdown-align-start-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              Start
            </Button>
            <Dropdown id="dropdown-align-start-sample" align="start">
              <p class="px-3 py-2 text-sm">Aligned to start</p>
            </Dropdown>

            <Button
              popovertarget="dropdown-align-center-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              Center
            </Button>
            <Dropdown id="dropdown-align-center-sample" align="center">
              <p class="px-3 py-2 text-sm">Aligned to center</p>
            </Dropdown>

            <Button
              popovertarget="dropdown-align-end-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              End
            </Button>
            <Dropdown id="dropdown-align-end-sample" align="end">
              <p class="px-3 py-2 text-sm">Aligned to end</p>
            </Dropdown>

            <Button
              popovertarget="dropdown-side-top-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              Top
            </Button>
            <Button
              popovertarget="dropdown-side-right-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              Right
            </Button>
            <Button
              popovertarget="dropdown-side-left-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
              Left
            </Button>
            <Button
              popovertarget="dropdown-side-bottom-sample"
              class="px-2 py-1 text-xs"
              variant="outline"
            >
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
      </Box>
      <Box title="Link" href="/docs/link">
        <div class="flex flex-wrap items-center gap-2">
          <Link href="/docs/link" class="text-xs">
            Text
          </Link>
          <Link href="/docs/link" variant="underline" class="text-xs">
            Underline
          </Link>
          <Link
            href="https://github.com/yuintei/htsx"
            target="_blank"
            rel="noreferrer"
            class="gap-1 px-2 py-1 text-xs"
          >
            With icon
            <span class="[&>svg]:size-3">
              <ExternalLink />
            </span>
          </Link>

          <Link href="/docs/link" variant="buttonPrimary" class="px-2 py-1 text-xs">
            Primary
          </Link>
          <Link href="/docs/link" variant="buttonSecondary" class="px-2 py-1 text-xs">
            Secondary
          </Link>
          <Link href="/docs/link" variant="buttonOutline" class="px-2 py-1 text-xs">
            Outline
          </Link>
          <Link
            href="https://github.com/yuintei/htsx"
            variant="buttonPrimary"
            target="_blank"
            rel="noreferrer"
            class="gap-1 px-2 py-1 text-xs"
          >
            With icon
            <span class="[&>svg]:size-3">
              <ExternalLink />
            </span>
          </Link>
        </div>
      </Box>
      <Box title="Popover" href="/docs/popover">
        <div class="not-prose flex flex-wrap items-center gap-2">
          <Button popovertarget="popover-menu-sample" variant="outline" class="px-2 py-1 text-xs">
            Menu
          </Button>
          <Popover id="popover-menu-sample">
            <div class="flex flex-col items-center gap-4 p-8">
              <a href="/">Home</a>
              <a href="/docs/button">Button</a>
              <Button
                variant="outline"
                popovertarget="popover-menu-sample"
                popovertargetaction="hide"
              >
                Close
              </Button>
            </div>
          </Popover>

          <Button popovertarget="popover-ssr-sample" class="px-2 py-1 text-xs">
            SSR Form
          </Button>
          <Popover id="popover-ssr-sample">
            <form method="get" action="/docs/popover" class="flex flex-col gap-4 p-8">
              <p>Are you sure to submit this form?</p>
              <div class="flex justify-center gap-4">
                <Button
                  variant="outline"
                  popovertarget="popover-ssr-sample"
                  popovertargetaction="hide"
                >
                  Cancel
                </Button>
                <Button type="submit" popovertarget="popover-ssr-sample" popovertargetaction="hide">
                  Submit
                </Button>
              </div>
            </form>
          </Popover>

          <Button
            popovertarget="popover-client-sample"
            variant="secondary"
            class="px-2 py-1 text-xs"
          >
            Client Action
          </Button>
          <Popover id="popover-client-sample">
            <div class="flex flex-col gap-4 p-8">
              <p>Are you sure to click this?</p>
              <div class="flex justify-center gap-4">
                <Button
                  variant="outline"
                  popovertarget="popover-client-sample"
                  popovertargetaction="hide"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  popovertarget="popover-client-sample"
                  popovertargetaction="hide"
                  onclick="alert('clicked')"
                >
                  Click
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      </Box>
      <Box title="Tab" href="/docs/tab">
        <Tab
          defaultValue="overview"
          class="text-xs"
          items={[
            {
              value: "overview",
              title: "Overview",
              content: "First panel. defaultValue can be set.",
            },
            {
              value: "details",
              title: "Details",
              content: "No JavaScript. HTML only.",
            },
            {
              value: "settings",
              title: "Settings",
              content: "Powered by hidden radio inputs and CSS sibling selectors.",
            },
          ]}
        />
      </Box>
      <Box title="Toast" href="/docs/toast">
        <div id="toast-sample-mini-root"></div>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/toast.js" />
        ) : (
          <script type="module" src="/src/client/toast.tsx" />
        )}
      </Box>
    </div>
  );
}
