import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PinDetailPage from './PinDetailPage';
import { pinMock } from '@/mocks/pin';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

// Mock useEmployees hook
const mockAssignPin = vi.fn();
vi.mock('@/ui/hooks/useEmployees', () => ({
  default: () => ({
    employees: [
      { id: '1', name: 'John Doe', picture: 'john.png' },
      { id: '2', name: 'Jane Smith', picture: 'jane.png' },
    ],
    assignPin: mockAssignPin,
  }),
}));

describe('PinDetailPage', () => {
  it('renders PinDetailPage and assigns pin', async () => {
    // Render the component with a valid pinId in the URL
    render(
      <MemoryRouter initialEntries={['/pin/1']}>
        <Routes>
          <Route path="/pin/:pinId" element={<PinDetailPage />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    // Verify that the page is rendered
    expect(screen.getByText(pinMock[0].pinTitle)).toBeInTheDocument();

    // Select the checkbox for John Doe
    const checkboxes = screen.getAllByRole('checkbox');
    const johnDoeCheckbox = checkboxes[0]; // Asumiendo que John Doe es el primer empleado
    fireEvent.click(johnDoeCheckbox);

    // Ensure the checkbox is checked
    expect(johnDoeCheckbox).toBeChecked();

    // Mock successful pin assignment
    mockAssignPin.mockResolvedValueOnce('Pin assigned successfully');

    // Click the Assign button
    fireEvent.click(screen.getByText('Assign'));

    // Verify the toast message
    await waitFor(() => {
      expect(screen.getByText('Pin assigned successfully')).toBeInTheDocument();
    });
  });

  it('displays an error message when pin assignment fails', async () => {
    // Render the component with a valid pinId in the URL
    render(
      <MemoryRouter initialEntries={['/pin/1']}>
        <Routes>
          <Route path="/pin/:pinId" element={<PinDetailPage />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    // Select the checkbox for John Doe
    const checkboxes = screen.getAllByRole('checkbox');
    const johnDoeCheckbox = checkboxes[0]; // Asumiendo que John Doe es el primer empleado
    fireEvent.click(johnDoeCheckbox);

    // Ensure the checkbox is checked
    expect(johnDoeCheckbox).toBeChecked();

    // Mock failed pin assignment
    mockAssignPin.mockRejectedValueOnce(new Error('Failed to assign pin'));

    // Click the Assign button
    fireEvent.click(screen.getByText('Assign'));

    // Verify the toast message
    await waitFor(() => {
      expect(screen.getByText('Failed to assign pin')).toBeInTheDocument();
    });
  });
});
