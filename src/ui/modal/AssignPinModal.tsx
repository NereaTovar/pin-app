import { useState } from "react";
import Modal from "react-modal";
import useEmployees from "@/ui/hooks/useEmployees";
import "./AssignPinModal.scss";

interface AssignPinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAssign: (employeeIds: string[]) => void;
}

const AssignPinModal = ({
  isOpen,
  onRequestClose,
  onAssign,
}: AssignPinModalProps) => {
  const { employees, loading } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = () => {
    onAssign(selectedEmployees);
    setSuccessMessage("Pin asignado con éxito");
    setTimeout(() => {
      setSuccessMessage(null);
      onRequestClose();
    }, 2000); // Mensaje visible por 2 segundos
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
        {successMessage && (
          <div className="assignPinModal__success">{successMessage}</div>
        )}
        <div className="assignPinModal__content">
          {employees.map((employee) => (
            <div key={employee.id} className="assignPinModal__employee">
              <input
                type="checkbox"
                id={employee.id}
                value={employee.id}
                onChange={() => handleCheckboxChange(employee.id)}
              />
              <label htmlFor={employee.id}>
                <img
                  src={employee.picture}
                  alt={employee.name}
                  className="assignPinModal__picture"
                />
                {employee.name}
              </label>
            </div>
          ))}
        </div>
        {selectedEmployees.length > 0 && (
          <div className="assignPinModal__buttons">
            <button
              className="assignPinModal__assignButton"
              onClick={handleSubmit}
            >
              Assign
            </button>
            <button
              className="assignPinModal__cancelButton"
              onClick={onRequestClose}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssignPinModal;
