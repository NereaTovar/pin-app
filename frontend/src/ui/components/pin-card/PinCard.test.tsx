import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PinCard from "./PinCard";
import "@testing-library/jest-dom";

// Mock components
vi.mock("../pin-logo/PinLogo", () => ({
  default: ({ imagePin }: { imagePin: string }) => (
    <img src={imagePin} alt="Pin Logo" />
  ),
}));

describe("PinCard", () => {
  const mockPin = {
    id: "1",
    pinTitle: "Employee of the Month",
    pinDescription: "Awarded for outstanding performance",
    imagePin: "path/to/pin.jpg",
  };

  it("renders the pin logo and title", () => {
    render(<PinCard pin={mockPin} />);

    expect(screen.getByAltText("Pin Logo")).toHaveAttribute(
      "src",
      "path/to/pin.jpg"
    );
    expect(screen.getByText("Employee of the Month")).toBeInTheDocument();
  });

  it("does not render the apply button when isButtonVisible is false", () => {
    render(<PinCard pin={mockPin} />);

    expect(screen.queryByText("Apply Pins")).not.toBeInTheDocument();
  });

  it("renders the apply button when isButtonVisible is true", () => {
    render(<PinCard pin={mockPin} isButtonVisible />);

    expect(screen.getByText("Apply Pins")).toBeInTheDocument();
  });

  it("calls handleClick when the card is clicked", () => {
    const handleClick = vi.fn();
    render(<PinCard pin={mockPin} handleClick={handleClick} />);

    fireEvent.click(screen.getByText("Employee of the Month"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
