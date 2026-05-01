import { hc } from "hono/client";
import { useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import type { FormSchemaType, SubmitApiType } from "../api/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Spinner } from "../components/ui/spinner";
import { toast } from "../components/ui/toast";

const client = hc<SubmitApiType>("/api/form");

const formSelectOptions: { value: FormSchemaType["select"]; label: string }[] = [
  { value: "option-a", label: "Option A" },
  { value: "option-b", label: "Option B" },
];

type Status = "idle" | "loading" | "success" | "error_zod" | "error";

type ZodErrors = {
  text?: string[];
  select?: string[];
};

const STATUS_MESSAGES: Partial<Record<Status, string>> = {
  success: "Submitted.",
  error_zod: "Invalid input.",
  error: "Server error.",
};

const getSelect = (event: Event) =>
  (event.target as HTMLSelectElement).value as FormSchemaType["select"];

function FormSample() {
  const [text, setText] = useState("");
  const [selectValue, setSelectValue] = useState<FormSchemaType["select"] | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [zodErrors, setZodErrors] = useState<ZodErrors>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setStatus("loading");
    setZodErrors({});

    try {
      const res = await client.submit.$post({
        json: { text, select: selectValue as FormSchemaType["select"] },
      });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setStatus("error_zod");
          setZodErrors({
            text: data.fieldErrors?.text,
            select: data.fieldErrors?.select,
          });
          toast({ status: "error", message: STATUS_MESSAGES.error_zod ?? "" });
          return;
        }
        setStatus("error");
        toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
        return;
      }
      setStatus("success");
      setText("");
      setSelectValue("");
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
        label="Text"
        name="text"
        value={text}
        onInput={(event) => setText((event.target as HTMLInputElement).value)}
        invalid={Boolean(zodErrors.text)}
        error={zodErrors.text?.[0]}
        placeholder="Text"
        disabled={status === "loading"}
        required
      />
      <Select
        id="form-select-sample"
        label="Select"
        name="select"
        value={selectValue}
        onChange={(event: Event) => setSelectValue(getSelect(event))}
        invalid={Boolean(zodErrors.select)}
        error={zodErrors.select?.[0]}
        disabled={status === "loading"}
        required
      >
        <option value="">Select an option</option>
        {formSelectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

function FormSampleMini() {
  const [text, setText] = useState("");
  const [selectValue, setSelectValue] = useState<FormSchemaType["select"] | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [zodErrors, setZodErrors] = useState<ZodErrors>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setStatus("loading");
    setZodErrors({});

    try {
      const res = await client.submit.$post({
        json: { text, select: selectValue as FormSchemaType["select"] },
      });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setStatus("error_zod");
          setZodErrors({
            text: data.fieldErrors?.text,
            select: data.fieldErrors?.select,
          });
          toast({ status: "error", message: STATUS_MESSAGES.error_zod ?? "" });
          return;
        }
        setStatus("error");
        toast({ status: "error", message: STATUS_MESSAGES.error ?? "" });
        return;
      }
      setStatus("success");
      setText("");
      setSelectValue("");
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
          label="Text"
          name="text"
          value={text}
          onInput={(event) => setText((event.target as HTMLInputElement).value)}
          invalid={Boolean(zodErrors.text)}
          error={zodErrors.text?.[0]}
          placeholder="Text"
          disabled={status === "loading"}
          required
          class="h-8 text-xs"
        />
        <Select
          id="form-select-sample"
          label="Select"
          name="select"
          value={selectValue}
          onChange={(event: Event) => setSelectValue(getSelect(event))}
          invalid={Boolean(zodErrors.select)}
          error={zodErrors.select?.[0]}
          disabled={status === "loading"}
          required
          class="h-8 text-xs"
        >
          <option value="">Select</option>
          {formSelectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
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
