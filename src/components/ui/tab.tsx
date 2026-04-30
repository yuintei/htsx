import type { Child, JSX } from "hono/jsx";
import { c } from "./c";
import { Sun, ThumbsUp } from "./icons";

export function Tab({
  id,
  defaultValue,
  items,
  class: custom,
  ...props
}: JSX.IntrinsicElements["div"] & {
  defaultValue?: string;
  items: { value: string; title: Child; content: Child }[];
}) {
  const groupName = id ?? crypto.randomUUID();
  const activeValue = items.find((item) => item.value === defaultValue)?.value ?? items[0]?.value;
  return (
    <div id={id} class={c("flex flex-wrap", custom)} {...props}>
      {items.map((item) => (
        <div key={item.value} class="group/tab contents">
          <input
            type="radio"
            id={`${groupName}-${item.value}`}
            name={groupName}
            checked={item.value === activeValue || undefined}
            class="sr-only"
          />
          <label
            for={`${groupName}-${item.value}`}
            class="-mb-px cursor-pointer border-b-2 border-transparent px-4 py-2 font-medium text-muted-foreground select-none group-has-checked/tab:border-primary group-has-checked/tab:text-foreground hover:text-foreground"
          >
            {item.title}
          </label>
          <div class="order-last hidden w-full border-t border-border p-4 group-has-checked/tab:block">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TabSample() {
  return (
    <div class="not-prose grid items-start gap-4 md:grid-cols-2">
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

      <Tab
        defaultValue="two"
        class="rounded-md border border-border bg-card text-card-foreground"
        items={[
          {
            value: "one",
            title: (
              <span class="flex items-center gap-2">
                <Sun />
                One
              </span>
            ),
            content: (
              <ul>
                <li>
                  <code>content</code> accepts JSX.
                </li>
                <li>Icons, lists, images, buttons, etc.</li>
              </ul>
            ),
          },
          {
            value: "two",
            title: (
              <span class="flex items-center gap-2">
                <ThumbsUp />
                Two
              </span>
            ),
            content: (
              <p>
                Inline elements like <strong>bold</strong> and <em>italic</em> work too.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}
