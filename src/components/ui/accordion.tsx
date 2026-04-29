import type { JSX, Child } from "hono/jsx";
import { c } from "./c";
import { ChevronDown, Sun, ThumbsUp } from "./icons";

export function Accordion({
  id,
  variant = "single",
  defaultOpen = [],
  items,
  class: custom,
  ...props
}: JSX.IntrinsicElements["div"] & {
  variant?: "single" | "multiple";
  defaultOpen?: string[];
  items: {
    value: string;
    title: Child;
    content: Child;
  }[];
}) {
  const groupName = variant === "single" ? (id ?? crypto.randomUUID()) : undefined;
  return (
    <div id={id} class={c("divide-y divide-border", custom)} {...props}>
      {items.map((item) => (
        <details
          key={item.value}
          name={groupName}
          open={defaultOpen.includes(item.value) || undefined}
          class="group/accordion-item"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-medium select-none hover:opacity-80">
            {item.title}
            <span class="shrink-0 text-muted-foreground transition-transform group-open/accordion-item:rotate-180">
              <ChevronDown />
            </span>
          </summary>
          <div class="px-4 pb-4 text-muted-foreground">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

export function AccordionSample() {
  return (
    <div class="flex flex-col gap-8">
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
          {
            value: "q3",
            title: "How do I close all items?",
            content: "Click the currently open item again.",
          },
        ]}
      />

      <Accordion
        variant="multiple"
        defaultOpen={["f1", "f3"]}
        items={[
          {
            value: "f1",
            title: "Feature A",
            content: "Multiple items can be open at the same time.",
          },
          {
            value: "f2",
            title: "Feature B",
            content: 'Pass variant="multiple" to enable this behavior.',
          },
          {
            value: "f3",
            title: "Feature C",
            content: "Use defaultOpen to pre-open specific items.",
          },
        ]}
      />

      <Accordion
        class="rounded-md border border-border bg-card text-card-foreground"
        items={[
          {
            value: "jsx1",
            title: (
              <span class="flex items-center gap-2">
                <Sun />
                JSX title
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
            value: "jsx2",
            title: (
              <span class="flex items-center gap-2">
                <ThumbsUp />
                Another JSX title
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
