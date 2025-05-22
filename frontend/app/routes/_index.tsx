import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import SummaryForm from "../components/SummaryForm";
import SummaryDisplay from "../components/SummaryDisplay";
import SnippetList from "../components/SnippetList";
import type { Snippet } from "../interfaces/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(`${process.env.API_URL}/api/snippets?page=${page}&limit=5`);
  const data = await res.json();
  return json(data);
};

export default function Index() {
  const { data: initialSnippets, total, page, limit } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Post your text here</h1>
      <SummaryForm />
      <SummaryDisplay />
      <SnippetList snippets={initialSnippets} />
    </div>
  );
}