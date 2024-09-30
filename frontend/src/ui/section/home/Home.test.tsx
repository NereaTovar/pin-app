import React from "react"; // Asegúrate de importar React
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import "@testing-library/jest-dom";

// Mock components
vi.mock("src/ui/components/tab-panel/TabPanel.tsx", () => ({
  TabPanel: ({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (
      <div>
        {tabs.map((tab, index) => (
          <button key={index} onClick={() => setSelectedTab(index)}>
            {tab.label}
          </button>
        ))}
        {tabs[selectedTab].content}
      </div>
    );
  },
}));

vi.mock("src/ui/components/employee-list/EmployeeList.tsx", () => ({
  default: () => <div>EmployeeList</div>,
}));

vi.mock("@/ui/section/home/pin-list/PinList", () => ({
  default: () => <div>PinList</div>,
}));

describe("Home", () => {
  it("renders TabPanel with correct tabs", () => {
    render(<Home />);

    expect(screen.getByText("List of Pins")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toBeInTheDocument();
  });

  it("renders PinList content by default", () => {
    render(<Home />);

    expect(screen.getByText("PinList")).toBeInTheDocument();
    expect(screen.queryByText("EmployeeList")).not.toBeInTheDocument();
  });

  it("renders EmployeeList content when Employees tab is clicked", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Employees"));
    
    expect(screen.getByText("EmployeeList")).toBeInTheDocument();
    expect(screen.queryByText("PinList")).not.toBeInTheDocument();
  });
});
