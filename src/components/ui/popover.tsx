import type { JSX, Child } from "hono/jsx";
import { Button } from "./button";
import { c } from "./c";

export function Popover({
  id,
  popover = "auto",
  class: custom,
  children,
  ...props
}: JSX.IntrinsicElements["div"] & {
  id: string;
  children?: Child;
}) {
  return (
    <div
      id={id}
      popover={popover}
      class={c(
        "m-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md backdrop:bg-background/50",
        custom,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PopoverSample() {
  return (
    <div class="not-prose flex flex-wrap items-center gap-4">
      <Button popovertarget="popover-menu-sample" variant="outline">
        Menu
      </Button>
      <Popover id="popover-menu-sample">
        <div class="flex flex-col items-center gap-4 p-8">
          <a href="/">Home</a>
          <a href="/docs/button">Button</a>
          <Button variant="outline" popovertarget="popover-menu-sample" popovertargetaction="hide">
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
            <Button variant="outline" popovertarget="popover-ssr-sample" popovertargetaction="hide">
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
  );
}
