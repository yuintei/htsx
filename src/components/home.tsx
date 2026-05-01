import type { Child } from "hono/jsx";
import { Accordion } from "./ui/accordion";
import { Link } from "./ui/link";

const InfoList: { title: Child; description: Child }[] = [
  {
    title: "hono/jsx native",
    description: "Works in SSR and client.",
  },
  {
    title: "Web standards",
    description: "HTML/CSS and minimal JS.",
  },
  {
    title: "Lightweight",
    description: "Tailwind only. No extra dependencies.",
  },
  {
    title: "Minimal",
    description: "No CLI, registry, MCP or agent skills.",
  },
];

const FaqList: { value: string; title: Child; content: Child }[] = [
  {
    value: "1",
    title: "Can my AI agent use htsx?",
    content: (
      <p>
        Yes.{" "}
        <Link href="/llms.txt" target="_blank" variant="underline">
          llms.txt
        </Link>{" "}
        is available.
      </p>
    ),
  },
  {
    value: "2",
    title: "Can I add components to htsx?",
    content: "Yes. See contribution guide.",
  },
];

export function Hero() {
  return (
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold">Simple UI toolkit for Hono</h1>
        <p class="text-xl font-medium text-muted-foreground">
          Fullstack Hono apps, made easy and fun!
          <br /> Free and Open source.
        </p>
      </div>
      <div class="flex gap-4">
        <Link variant="buttonPrimary" href="/docs/quickstart">
          Quickstart
        </Link>
        <Link variant="buttonOutline" href="/docs/components">
          See Components
        </Link>
      </div>
    </div>
  );
}

export function Info() {
  return (
    <div class="grid gap-4 md:grid-cols-2">
      {InfoList.map(({ title, description }) => (
        <div class="flex flex-col gap-2 rounded-md border border-border bg-card p-4">
          <h2 class="text-lg font-bold text-card-foreground">{title}</h2>
          <p class="text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <Accordion
      class="mx-auto max-w-xl"
      variant="multiple"
      defaultOpen={["1", "2"]}
      items={FaqList}
    />
  );
}
