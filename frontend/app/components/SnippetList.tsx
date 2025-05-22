import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import type { Snippet } from "../interfaces/types";
import { Fragment } from "react";
import TextModal from "./TextModal";

interface Props {
  snippets: Snippet[];
}

export default function SnippetList({ snippets }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalContent, setModalContent] = useState<string | null>(null);
  const page = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (delta: number) => {
    const newPage = page + delta;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      return params;
    });
  };

  const truncateText = (text: string, wordLimit = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <div className="mt-10">
    <hr className="mb-4" />
      <h2 className="text-xl font-semibold mb-2">Previous Summaries</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="font-semibold">Text</div>
        <div className="font-semibold">Summary</div>
        {snippets.map((s) => (
            <Fragment key={s.id}>
                <div className="text-sm text-gray-500 cursor-pointer hover:underline" onClick={() => setModalContent(s.text)}>
                {truncateText(s.text)}
                </div>
                <div className="text-sm text-gray-700">
                {s.summary}
                </div>
            </Fragment>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={page <= 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Next
        </button>
      </div>

      {modalContent && (
        <TextModal text={modalContent} onClose={() => setModalContent(null)} />
      )}
    </div>
  );
}