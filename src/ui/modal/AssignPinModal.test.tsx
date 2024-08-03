import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from 'react-modal';
import AssignPinModal from './AssignPinModal';
import '@testing-library/jest-dom';

// Mock de useEmployees
vi.mock('@/ui/hooks/useEmployees', () => ({
  default: () => ({
    employees: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ],
    loading: false,
  }),
}));

describe('AssignPinModal', () => {
  const onAssignMock = vi.fn();
  const onRequestCloseMock = vi.fn();

  beforeEach(() => {
    onAssignMock.mockClear();
    onRequestCloseMock.mockClear();
    Modal.setAppElement(document.createElement('div')); // Set a dummy app element
  });

  const renderComponent = () =>
    render(
      <AssignPinModal
        isOpen={true}
        onRequestClose={onRequestCloseMock}
        onAssign={onAssignMock}
      />
    );

  it('renders the modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Assign Pin')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('changes checkbox state correctly', () => {
    renderComponent();

    const johnCheckbox = screen.getByLabelText('John Doe');
    const janeCheckbox = screen.getByLabelText('Jane Smith');

    fireEvent.click(johnCheckbox);
    expect(johnCheckbox).toBeChecked();

    fireEvent.click(janeCheckbox);
    expect(janeCheckbox).toBeChecked();

    fireEvent.click(johnCheckbox);
    expect(johnCheckbox).not.toBeChecked();
  });

  it('calls onAssign with selected employee IDs', () => {
    renderComponent();

    const johnCheckbox = screen.getByLabelText('John Doe');
    const assignButton = screen.getByText('Assign');

    fireEvent.click(johnCheckbox);
    fireEvent.click(assignButton);

    expect(onAssignMock).toHaveBeenCalledWith(['1']);
  });

  it('calls onRequestClose when cancel button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onRequestCloseMock).toHaveBeenCalled();
  });
});
