import type { Child, JSX } from "hono/jsx";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { c } from "./ui/c";
import { Dropdown } from "./ui/dropdown";
import { ChevronRight, Copy, ExternalLink, ThumbsUp } from "./ui/icons";
import { Input } from "./ui/input";
import { Link } from "./ui/link";
import { Popover } from "./ui/popover";
import { Select } from "./ui/select";
import { Spinner } from "./ui/spinner";
import { Tab } from "./ui/tab";

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
      <Link href={href}>
        <h3 class="font-bold">{title}</h3>
        <ChevronRight />
      </Link>
      <div class={c("flex w-full flex-col rounded-md border border-border p-4", custom)} {...props}>
        {children}
      </div>
    </div>
  );
}

export function List() {
  return (
    <div class="not-prose mx-auto grid w-full items-start gap-8 md:grid-cols-2">
      <Box title="Accordion" href="/docs/accordion">
        <Accordion
          defaultOpen={["q1"]}
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
          <Button
            variant="outline"
            class="rounded-full border border-primary font-bold text-primary italic"
          >
            Custom
          </Button>
        </div>
      </Box>
      <Box title="Checkbox" href="/docs/checkbox">
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
        </div>
      </Box>
      <Box title="Dropdown" href="/docs/dropdown">
        <div class="flex flex-wrap items-center gap-4">
          <Button popovertarget="dropdown-menu-sample" variant="outline">
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

          <Button popovertarget="dropdown-actions-sample" variant="primary">
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

          <Button popovertarget="dropdown-custom-sample" variant="secondary">
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
      </Box>
      <Box title="Form" href="/docs/form">
        <div id="form-sample-root" class="mx-auto w-full max-w-sm"></div>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/form.js" />
        ) : (
          <script type="module" src="/src/client/form.tsx" />
        )}
      </Box>
      <Box title="Input" href="/docs/input">
        <div class="not-prose grid grid-cols-2 gap-4">
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
      </Box>
      <Box title="Link" href="/docs/link">
        <div class="not-prose flex flex-wrap items-center gap-4">
          <Link href="/docs/link">Text</Link>
          <Link href="/docs/link" variant="underline">
            Underline
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
      </Box>
      <Box title="Popover" href="/docs/popover">
        <div class="not-prose flex flex-wrap items-center gap-4">
          <Button popovertarget="popover-menu-sample" variant="outline">
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

          <Button popovertarget="popover-ssr-sample" variant="primary">
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

          <Button popovertarget="popover-client-sample" variant="secondary">
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
      <Box title="Select" href="/docs/select">
        <div class="not-prose grid grid-cols-2 gap-4">
          <Select
            id="country"
            name="country"
            label="Country"
            invalid
            error="Select a country."
            required
          >
            <option value="" selected>
              Select a country
            </option>
            <option value="jp">Japan</option>
            <option value="us">United States</option>
          </Select>
          <Select id="timezone" name="timezone" label="Timezone">
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
        </div>
      </Box>
      <Box title="Spinner" href="/docs/spinner">
        <div class="not-prose flex flex-wrap items-center gap-4">
          <Spinner />
          <Spinner class="text-primary" />
          <Spinner class="size-6" />
          <Button type="submit" disabled>
            <Spinner />
          </Button>
        </div>
      </Box>
      <Box title="Tab" href="/docs/tab">
        <Tab
          defaultValue="overview"
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
        <div id="toast-sample-root"></div>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/toast.js" />
        ) : (
          <script type="module" src="/src/client/toast.tsx" />
        )}
      </Box>
    </div>
  );
}
