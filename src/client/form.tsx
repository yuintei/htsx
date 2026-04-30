import { hc } from "hono/client";
import { useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import type { SubmitApiType } from "../api/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Spinner } from "../components/ui/spinner";
import { toast } from "../components/ui/toast";

const client = hc<SubmitApiType>("/api/form");

type Status = "idle" | "loading" | "success" | "error_zod" | "error";

type ZodErrors = {
  text1?: string[];
  text2?: string[];
};

const STATUS_MESSAGES: Partial<Record<Status, string>> = {
  success: "Submitted.",
  error_zod: "Invalid input.",
  error: "Server error.",
};

function FormSample() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [zodErrors, setZodErrors] = useState<ZodErrors>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setStatus("loading");
    setZodErrors({});

    try {
      const res = await client.submit.$post({ json: { text1, text2 } });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setStatus("error_zod");
          setZodErrors({
            text1: data.fieldErrors?.text1,
            text2: data.fieldErrors?.text2,
          });
          toast({ status: "error", message: STATUS_MESSAGES.error_zod ?? "" });
          return;
        }
        setStatus("error");
        toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
        return;
      }
      setStatus("success");
      setText1("");
      setText2("");
      toast({ status: "success", message: STATUS_MESSAGES.success ?? "" });
    } catch {
      setStatus("error");
      toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      class="not-prose flex w-full max-w-sm flex-col gap-4"
    >
      <Input
        id="form-text-sample"
        label="Text 1"
        name="text1"
        value={text1}
        onInput={(event) => setText1((event.target as HTMLInputElement).value)}
        invalid={Boolean(zodErrors.text1)}
        error={zodErrors.text1?.[0]}
        placeholder="Text 1"
        disabled={status === "loading"}
        required
      />
      <Input
        id="form-text-2-sample"
        label="Text 2"
        name="text2"
        value={text2}
        onInput={(event) => setText2((event.target as HTMLInputElement).value)}
        invalid={Boolean(zodErrors.text2)}
        error={zodErrors.text2?.[0]}
        placeholder="Text 2"
        disabled={status === "loading"}
        required
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

function FormSampleMini() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [zodErrors, setZodErrors] = useState<ZodErrors>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setStatus("loading");
    setZodErrors({});

    try {
      const res = await client.submit.$post({ json: { text1, text2 } });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setStatus("error_zod");
          setZodErrors({
            text1: data.fieldErrors?.text1,
            text2: data.fieldErrors?.text2,
          });
          toast({ status: "error", message: STATUS_MESSAGES.error_zod ?? "" });
          return;
        }
        setStatus("error");
        toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
        return;
      }
      setStatus("success");
      setText1("");
      setText2("");
      toast({ status: "success", message: STATUS_MESSAGES.success ?? "" });
    } catch {
      setStatus("error");
      toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit} class="not-prose flex w-full flex-col gap-4">
      <div class="flex gap-4">
        <Input
          id="form-text-sample"
          label="Text 1"
          name="text1"
          value={text1}
          onInput={(event) => setText1((event.target as HTMLInputElement).value)}
          invalid={Boolean(zodErrors.text1)}
          error={zodErrors.text1?.[0]}
          placeholder="Text 1"
          disabled={status === "loading"}
          required
          class="h-8 text-xs"
        />
        <Input
          id="form-text-2-sample"
          label="Text 2"
          name="text2"
          value={text2}
          onInput={(event) => setText2((event.target as HTMLInputElement).value)}
          invalid={Boolean(zodErrors.text2)}
          error={zodErrors.text2?.[0]}
          placeholder="Text 2"
          disabled={status === "loading"}
          required
          class="h-8 text-xs"
        />
      </div>
      <Button type="submit" disabled={status === "loading"} class="px-2 py-1 text-xs">
        {status === "loading" ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

const root = document.getElementById("form-sample-root");
if (root) render(<FormSample />, root);

const miniRoot = document.getElementById("form-sample-mini-root");
if (miniRoot) render(<FormSampleMini />, miniRoot);
