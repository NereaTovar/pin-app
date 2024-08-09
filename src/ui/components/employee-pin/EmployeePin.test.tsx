import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EmployeePin from "./EmployeePin";
import usePinDetails from "@/hooks/usePinDetail";
import "@testing-library/jest-dom";

// Mock components
vi.mock("../pin/pin-anniversary/PinAnniversary", () => ({
  default: ({ number, color }: { number: number; color: string }) => (
    <div>
      Anniversary Pin: {number} years, Color: {color}
    </div>
  ),
}));

vi.mock("../pin/pin-department/PinDepartment", () => ({
  default: ({ department }: { department: string }) => (
    <div>Department Pin: {department}</div>
  ),
}));

// Mock usePinDetails hook
vi.mock("@/hooks/usePinDetail", () => ({
  default: vi.fn(),
}));

describe("EmployeePin", () => {
  const mockUsePinDetails = usePinDetails as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUsePinDetails.mockReturnValue({
      color: "blue",
    });
  });

  it("displays the anniversary pin with the correct years and color", () => {
    render(
      <EmployeePin
        startDate="2020-01-01"
        department="Engineering"
        pins={[]}
        yearsInCompany={2}
      />
    );
    expect(
      screen.getByText("Anniversary Pin: 2 years, Color: blue")
    ).toBeInTheDocument();
  });

  it("displays the department pin with the correct department", () => {
    render(
      <EmployeePin
        startDate="2020-01-01"
        department="Engineering"
        pins={[]}
        yearsInCompany={2}
      />
    );
    expect(screen.getByText("Department Pin: Engineering")).toBeInTheDocument();
  });

  it("displays the employee's pins correctly", () => {
    const pins = [
      { type: "Award", imagePin: "path/to/award.jpg" },
      { type: "Achievement", imagePin: "path/to/achievement.jpg" },
    ];

    render(
      <EmployeePin
        startDate="2020-01-01"
        department="Engineering"
        pins={pins}
        yearsInCompany={2}
      />
    );

    expect(screen.getByAltText("Award")).toHaveAttribute(
      "src",
      "path/to/award.jpg"
    );
    expect(screen.getByAltText("Achievement")).toHaveAttribute(
      "src",
      "path/to/achievement.jpg"
    );
  });
});
