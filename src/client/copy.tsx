import { useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import { Button } from "../components/ui/button";
import { Copy, Check } from "../components/ui/icons";

function CopyButton({ code }: { code: HTMLElement }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  };

  return (
    <Button
      type="button"
      variant="outline"
      class="copy-button p-1.5"
      onClick={copy}
      aria-label={copied ? "Copied code" : "Copy code"}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}

document.querySelectorAll("pre").forEach((pre) => {
  const code = pre.querySelector("code");
  if (!code) return;
  render(<CopyButton code={code} />, pre.appendChild(document.createElement("div")));
});
