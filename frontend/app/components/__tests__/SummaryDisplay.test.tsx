import { render, screen } from "@testing-library/react";
import SummaryDisplay from "../SummaryDisplay";
import { describe, it, expect } from "vitest";

describe("SummaryDisplay", () => {
  it("renders animated summary text", async () => {
    render(<SummaryDisplay summary="Test summary" />);
    const element = await screen.findByText(/Test/);
    expect(element).toBeInTheDocument();
  });

  it("renders nothing when summary is empty", () => {
    const { container } = render(<SummaryDisplay summary="" />);
    expect(container).toBeEmptyDOMElement();
  });
});