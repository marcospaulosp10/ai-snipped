import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import { describe, it, expect, vi } from "vitest";

describe("SummaryForm", () => {
  it("calls onSummaryGenerated on submit", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => {
            let sent = false;
            return {
              read: () => {
                if (sent) return Promise.resolve({ done: true, value: undefined });
                sent = true;
                return Promise.resolve({
                  done: false,
                  value: new TextEncoder().encode("Test summary")
                });
              },
            };
          },
        },
      })
    ) as any;

    const onSummaryGenerated = vi.fn();
    render(<SummaryForm onSummaryGenerated={onSummaryGenerated} />);

    fireEvent.change(screen.getByPlaceholderText(/paste/i), {
      target: { value: "Some input text for summary." },
    });

    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() => {
      expect(onSummaryGenerated).toHaveBeenCalled();
    });
  });
});