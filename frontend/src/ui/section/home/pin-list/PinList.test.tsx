import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PinList from './PinList';
import { pinMock } from '@/mocks/pin';
import '@testing-library/jest-dom';

// Mock components
vi.mock('@/ui/components/pin-card/PinCard', () => ({
  default: ({ pin, handleClick }: { pin: { pinTitle: string }; handleClick: () => void }) => (
    <div onClick={handleClick}>
      <div>{pin.pinTitle}</div>
    </div>
  ),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PinList', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the banner with the correct text', () => {
    renderWithRouter(<PinList />);

    expect(screen.getByText('Employee Recognition Pins')).toBeInTheDocument();
    expect(
      screen.getByText(
        'At our company, we value and recognize the hard work, dedication, and achievements of our employees. The pins below represent various milestones and accomplishments. Click on a pin to learn more about its significance and to assign it to a deserving team member.'
      )
    ).toBeInTheDocument();
  });

  it('renders a list of pins', () => {
    renderWithRouter(<PinList />);

    pinMock.forEach((pin) => {
      expect(screen.getByText(pin.pinTitle)).toBeInTheDocument();
    });
  });

  it('navigates to the correct pin detail page on pin click', () => {
    renderWithRouter(<PinList />);

    const firstPin = pinMock[0];
    fireEvent.click(screen.getByText(firstPin.pinTitle));

    expect(mockNavigate).toHaveBeenCalledWith(`/pin/${firstPin.id}`);
  });
});
