import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TabPanel } from './TabPanel';
import { StoreContext, StoreProvider } from 'src/ui/components/store-context/StoreContext.tsx';
import '@testing-library/jest-dom';

// Mock components
vi.mock('src/ui/components/employee-list/EmployeeList.tsx', () => ({
  default: () => <div>EmployeesPanel</div>,
}));

vi.mock('src/ui/modal/AssignPinModal.tsx', () => ({
  default: ({ isOpen }: { isOpen: boolean }) => isOpen ? <div>AssignPinModal</div> : null,
}));

describe('TabPanel', () => {
  const tabs = [
    { label: 'Employees', content: <div>EmployeesPanel</div> },
    { label: 'Assign Pin', content: <div>AssignPinModal</div> },
  ];

  const renderWithStore = (ui: React.ReactElement) => {
    return render(
      <StoreProvider>
        {ui}
      </StoreProvider>
    );
  };

  it('renders the correct tabs', () => {
    renderWithStore(<TabPanel tabs={tabs} />);

    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Assign Pin')).toBeInTheDocument();
  });

  it('renders the correct content for the default tab', () => {
    renderWithStore(<TabPanel tabs={tabs} />);

    expect(screen.getByText('EmployeesPanel')).toBeInTheDocument();
    expect(screen.queryByText('AssignPinModal')).not.toBeInTheDocument();
  });

  it('changes content when a different tab is clicked', async () => {
    renderWithStore(<TabPanel tabs={tabs} />);

    fireEvent.click(screen.getByText('Assign Pin'));

    await waitFor(() => {
      expect(screen.getByText('AssignPinModal')).toBeInTheDocument();
      expect(screen.queryByText('EmployeesPanel')).not.toBeInTheDocument();
    });
  });

  it('applies active class to the correct tab button', () => {
    renderWithStore(<TabPanel tabs={tabs} />);

    const employeesTab = screen.getByText('Employees');
    const assignPinTab = screen.getByText('Assign Pin');

    expect(employeesTab).toHaveClass('tabPanel__button--active');
    expect(assignPinTab).not.toHaveClass('tabPanel__button--active');

    fireEvent.click(assignPinTab);

    expect(employeesTab).not.toHaveClass('tabPanel__button--active');
    expect(assignPinTab).toHaveClass('tabPanel__button--active');
  });
});
