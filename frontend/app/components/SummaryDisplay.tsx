import { useEffect, useState } from "react";

interface Props {
  summary: string;
}

export default function SummaryDisplay({ summary }: Props) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!summary) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(summary.slice(0, index + 1));
      index++;
      if (index >= summary.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [summary]);

  if (!summary) return null;

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <strong>Summary:</strong>
      <p className="mt-2 whitespace-pre-line font-mono">{displayedText}</p>
    </div>
  );
}