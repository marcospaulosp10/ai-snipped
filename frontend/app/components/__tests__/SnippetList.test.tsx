import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SnippetList from "../SnippetList";
import { MemoryRouter } from "react-router-dom";

describe("SnippetList", () => {
  const mockSnippets = [
    { id: "1", text: "This is a long text that should be truncated in the list.", summary: "Short summary." },
    { id: "2", text: "Another example of a long snippet input to show behavior.", summary: "Another summary." }
  ];

  it("renders snippet items and handles pagination buttons", () => {
    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <SnippetList snippets={mockSnippets} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Text/)).toBeInTheDocument();
    expect(screen.getByText(/Summary/)).toBeInTheDocument();
    expect(screen.getAllByText(/.../).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Page 1/)).toBeInTheDocument();
  });

  it("opens and closes the modal when snippet text is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <SnippetList snippets={mockSnippets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText(/This is a long/)[0]);
    expect(screen.getByText(/Full Text/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Close/));
    expect(screen.queryByText(/Full Text/)).not.toBeInTheDocument();
  });
});
