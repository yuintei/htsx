import { render } from "hono/jsx/dom";
import { toast } from "../components/ui/toast";
import { Button } from "../components/ui/button";

function ToastSamle() {
  return (
    <div class="not-prose flex flex-wrap gap-4">
      <Button onClick={() => toast({ status: "success", message: "Success!" })}>Success</Button>
      <Button onClick={() => toast({ status: "error", message: "Error" })}>Error</Button>
      <Button
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
