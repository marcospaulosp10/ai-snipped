import { useState, useRef } from "react";
import { useFetcher } from "@remix-run/react";

export default function SummaryForm() {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleSend = async (formData: FormData) => {
    const raw = formData.get("text") as string;
    const clean = raw.replace(/["'`<>\\{}]/g, "");
    setSummary("");
    setIsLoading(true);
    setAlert(null);

    try {
      const res = await fetch(`/api/summary?text=${encodeURIComponent(clean)}`);
      if (!res.ok) throw new Error("Failed to stream");
      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setSummary((prev) => prev + chunk);
        summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      setIsLoading(false);
    } catch (err: any) {
      setAlert(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <fetcher.Form method="post" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSend(formData);
      }} className="space-y-4">
        <textarea
          name="text"
          className="w-full p-3 border rounded-md"
          placeholder="Paste your content here..."
          rows={6}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </fetcher.Form>

      {alert && <div className="mt-4 bg-red-100 text-red-700 p-3 rounded">{alert}</div>}
      <div ref={summaryRef}></div>
    </div>
  );
}