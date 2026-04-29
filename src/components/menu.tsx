import { MENU } from "../lib/constants";
import { Button } from "./ui/button";
import { MenuIcon } from "./ui/icons";
import { Popover } from "./ui/popover";

export default function Menu() {
  return (
    <div class="flex md:hidden">
      <Button variant="primary" popovertarget="menu">
        <MenuIcon />
      </Button>
      <Popover id="menu">
        <div class="flex flex-col items-center gap-16 p-16">
          <nav>
            <ul class="flex flex-col items-center gap-8">
              {MENU.map((item) => (
                <li key={item.href}>
                  <a href={item.href} class="p-2 hover:underline active:opacity-50">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            popovertarget="menu"
            popovertargetaction="hide"
            class="p-2 hover:underline active:opacity-50"
          >
            Close
          </button>
        </div>
      </Popover>
    </div>
  );
}
