import { render } from "hono/jsx/dom";
import { toast } from "../components/ui/toast";
import { Button } from "../components/ui/button";

function ToastSamle() {
  return (
    <div class="not-prose flex flex-wrap gap-4">
      <Button variant="primary" onClick={() => toast({ status: "success", message: "Success!" })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast({ status: "error", message: "Error" })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            status: "success",
            message: "The quick brown fox jumps over the lazy dog.",
            position: "bottom",
            duration: 8000,
          })
        }
      >
        Custom
      </Button>
    </div>
  );
}

function ToastSamleMini() {
  return (
    <div class="not-prose flex flex-wrap gap-2">
      <Button
        variant="primary"
        class="px-2 py-1 text-xs"
        onClick={() => toast({ status: "success", message: "Success!" })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        class="px-2 py-1 text-xs"
        onClick={() => toast({ status: "error", message: "Error" })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        class="px-2 py-1 text-xs"
        onClick={() =>
          toast({
            status: "success",
            message: "The quick brown fox jumps over the lazy dog.",
            position: "bottom",
            duration: 8000,
          })
        }
      >
        Custom
      </Button>
    </div>
  );
}

const root = document.getElementById("toast-sample-root");
if (root) render(<ToastSamle />, root);

const miniRoot = document.getElementById("toast-sample-mini-root");
if (miniRoot) render(<ToastSamleMini />, miniRoot);
