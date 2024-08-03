import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EmployeeList from "./EmployeeList";
import { AuthProvider } from "@/ui/context/auth/Auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import useEmployees from "@/ui/hooks/useEmployees";

// Define the prop types for the EmployeePin mock
interface EmployeePinProps {
  startDate: string;
  department: string;
  pins: string[];
  yearsInCompany: number;
}

// Mocking the EmployeePin component
vi.mock("@/ui/components/employee-pin/EmployeePin", () => ({
  default: ({ startDate, department, pins, yearsInCompany }: EmployeePinProps) => (
    <div>
      <span>{startDate}</span>
      <span>{department}</span>
      <span>{pins.join(", ")}</span>
      <span>{yearsInCompany}</span>
    </div>
  ),
}));

// Mocking the useEmployees hook
vi.mock("@/ui/hooks/useEmployees", () => ({
  default: vi.fn(),
}));

describe("EmployeeList", () => {
  const mockUseEmployees = useEmployees as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseEmployees.mockReturnValue({
      employees: [
        {
          id: "1",
          name: "John Doe",
          picture: "path/to/john.jpg",
          startDate: "2020-01-01",
          department: "Engineering",
          pins: ["Pin1", "Pin2"],
          yearsInCompany: 2,
        },
        {
          id: "2",
          name: "Jane Smith",
          picture: "path/to/jane.jpg",
          startDate: "2019-01-01",
          department: "Marketing",
          pins: ["Pin3"],
          yearsInCompany: 3,
        },
      ],
      loading: false,
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={ui} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("shows 'Loading...' message while employees are loading", () => {
    mockUseEmployees.mockReturnValueOnce({
      employees: [],
      loading: true,
    });
    renderWithProviders(<EmployeeList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows 'No employees found' message if there are no employees", () => {
    mockUseEmployees.mockReturnValueOnce({
      employees: [],
      loading: false,
    });
    renderWithProviders(<EmployeeList />);
    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });

  it("displays the list of employees correctly", () => {
    renderWithProviders(<EmployeeList />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters the employee list based on the search term", () => {
    renderWithProviders(<EmployeeList />);
    fireEvent.change(screen.getByPlaceholderText("Search employee"), {
      target: { value: "Jane" },
    });
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("clears the search term when the 'X' button is clicked", () => {
    renderWithProviders(<EmployeeList />);
    fireEvent.change(screen.getByPlaceholderText("Search employee"), {
      target: { value: "Jane" },
    });
    fireEvent.click(screen.getByText("X"));
    expect(screen.getByPlaceholderText("Search employee")).toHaveValue("");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
