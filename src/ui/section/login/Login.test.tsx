import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./Login";
import { AuthProvider } from "@/ui/context/auth/Auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock GoogleAuth component
vi.mock("../../components/google-auth/GoogleAuth", () => ({
  default: ({ onLoginSuccess }: { onLoginSuccess: (userData: any) => void }) => {
    const mockUserData = {
      id: "123",
      profilePictureUrl: "path/to/profile/picture.jpg",
      email: "test@example.com",
      name: "Test User",
    };

    return (
      <button onClick={() => onLoginSuccess(mockUserData)}>GoogleAuth</button>
    );
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login", () => {
  const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="*" element={ui} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("renders GoogleAuth component", () => {
    renderWithRouter(<Login />);

    expect(screen.getByText("GoogleAuth")).toBeInTheDocument();
  });
});
