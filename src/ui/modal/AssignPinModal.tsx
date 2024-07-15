import { useState } from 'react';
import Modal from 'react-modal';
import useEmployees from '@/ui/hooks/useEmployees';
import './AssignPinModal.scss';

interface AssignPinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAssign: (employeeIds: string[]) => void;
}

const AssignPinModal = ({ isOpen, onRequestClose, onAssign }: AssignPinModalProps) => {
  const { employees, loading } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = () => {
    onAssign(selectedEmployees);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Assign Pin"
    >
      <h2>Assign Pin</h2>
      <div className="assignPinModal">
        {employees.map((employee) => (
          <div key={employee.id} className="assignPinModal__employee">
            <input
              type="checkbox"
              id={employee.id}
              value={employee.id}
              onChange={() => handleCheckboxChange(employee.id)}
            />
            <label htmlFor={employee.id}>{employee.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Assign</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default AssignPinModal;
