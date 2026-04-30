import Menu from "./menu";
import { MENU } from "../lib/constants";
import { Button } from "./ui/button";
import { Sun, Moon, GithubBlack, GithubWhite } from "./ui/icons";

export default function Header() {
  return (
    <header class="sticky top-0 z-10 flex items-center justify-between bg-background py-4">
      <div class="flex items-center gap-16">
        <a href="/" class="text-xl font-bold hover:opacity-80 active:opacity-70" translate="no">
          htsx
        </a>
        <nav>
          <ul class="hidden gap-8 md:flex">
            {MENU.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <a href={item.href} class="text-sm font-semibold hover:underline active:opacity-50">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/yuintei/htsx" target="_blank" aria-label="Github" class="p-2">
          <span class="hidden dark:block">
            <GithubWhite />
          </span>
          <span class="dark:hidden">
            <GithubBlack />
          </span>
        </a>
        <Button variant="outline" id="theme-toggle" aria-label="Toggle theme" class="p-2">
          <span class="hidden dark:block">
            <Sun />
          </span>
          <span class="dark:hidden">
            <Moon />
          </span>
        </Button>
        <Menu />
      </div>
    </header>
  );
}
