import { Button } from "./ui/button";
import { Accordion } from "./ui/accordion";
import { Copy, GithubBlack, GithubWhite, ThumbsUp } from "./ui/icons";
import { Link } from "./ui/link";

const InfoList: { title: string; description: string }[] = [
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

const FaqList: { value: string; title: string; content: string }[] = [
  {
    value: "1",
    title: "Can my AI agent use htsx?",
    content: "Yes. llms.txt is available.",
  },
  {
    value: "2",
    title: "Can I add components to htsx?",
    content: "Yes. See contribution guide.",
  },
];

export function Hero() {
  return (
    <div class="grid gap-16 md:grid-cols-2">
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
          <Link
            variant="buttonSecondary"
            href="https://github.com/yuintei/htsx"
            target="_blank"
            rel="noreferrer"
            class="gap-2"
          >
            GitHub
            <span>
              <span class="hidden dark:block">
                <GithubWhite />
              </span>
              <span class="dark:hidden">
                <GithubBlack />
              </span>
            </span>
          </Link>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-4 rounded-md border border-border bg-card p-4">
        <Button variant="primary" class="px-2.5 py-1.5 text-xs">
          Primary
        </Button>
        <Button variant="secondary" class="px-2.5 py-1.5 text-xs">
          Secondary
        </Button>
        <Button variant="outline" class="px-2.5 py-1.5 text-xs">
          Outline
        </Button>
        <Button variant="destructive" class="px-2.5 py-1.5 text-xs">
          Destructive
        </Button>
        <Button disabled class="px-2.5 py-1.5 text-xs">
          Disabled
        </Button>
        <Button type="submit" class="px-2.5 py-1.5 text-xs">
          Submit
        </Button>
        <Button variant="outline" class="p-1">
          <Copy />
        </Button>
        <Button variant="primary" class="gap-1 px-2.5 py-1.5 text-xs">
          Like
          <ThumbsUp />
        </Button>
        <Button class="rounded-full bg-orange-400 px-2.5 py-1.5 font-bold text-white italic">
          Custom
        </Button>
      </div>
    </div>
  );
}

export function Info() {
  return (
    <div class="grid gap-4 md:grid-cols-2">
      {InfoList.map(({ title, description }) => (
        <div class="flex flex-col gap-2 rounded-md border border-border bg-secondary p-4">
          <h2 class="text-lg font-bold text-secondary-foreground">{title}</h2>
          <p class="text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  return <Accordion variant="multiple" defaultOpen={["1", "2"]} items={FaqList} />;
}
