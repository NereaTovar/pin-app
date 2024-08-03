import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";
import {
  AuthProvider,
  useAuth as originalUseAuth,
} from "@/ui/context/auth/Auth";
import "@testing-library/jest-dom";

// Mock components
vi.mock("../buttons/back-button/BackButton", () => ({
  default: () => <button>BackButton</button>,
}));

vi.mock("../buttons/rindus-logo/RindusLogo", () => ({
  default: () => <div>RindusLogo</div>,
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

describe("Header", () => {
  let mockUseAuth: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseAuth = vi.fn(() => ({
      userProfileData: {
        id: "123",
        profilePictureUrl: "path/to/profile/picture.jpg",
        email: "test@example.com",
        name: "Test User",
      },
    }));

    vi.doMock("@/ui/context/auth/Auth", () => ({
      ...originalUseAuth,
      useAuth: mockUseAuth,
    }));
  });

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

  it("renders RindusLogo on the login page", () => {
    renderWithRouter(<Header />, { route: "/login" });
    expect(screen.getByText("RindusLogo")).toBeInTheDocument();
  });

  it("does not render BackButton on the home page", () => {
    renderWithRouter(<Header />, { route: "/" });
    expect(screen.queryByText("BackButton")).not.toBeInTheDocument();
  });


});
