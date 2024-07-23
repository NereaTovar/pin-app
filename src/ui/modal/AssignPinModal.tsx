import { useState } from "react";
import Modal from "react-modal";
import useEmployees from "@/ui/hooks/useEmployees";
import "./AssignPinModal.scss";

// Define the Pin type here
interface Pin {
  type: string;
  date_hire?: string;
  color_hire?: string;
  department?: string;
  color?: string;
  imagePin?: string;
}

interface AssignPinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AssignPinModal = ({ isOpen, onRequestClose }: AssignPinModalProps) => {
  const { employees, loading, assignPin } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [pinType, setPinType] = useState<string>(""); // Tipo de pin
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async () => {
    const pin: Pin = { type: pinType };

    const employeeWithPin = employees.find(
      (employee) =>
        selectedEmployees.includes(employee.id) &&
        employee.pins.some((p) => p.type === pinType)
    );

    if (employeeWithPin) {
      setErrorMessage(
        `El empleado ${employeeWithPin.name} ya tiene ese pin asignado.`
      );
    } else {
      await Promise.all(
        selectedEmployees.map((employeeId) => assignPin(employeeId, pin))
      );
      setSuccessMessage("Pin asignado con éxito");
      setTimeout(() => {
        setSuccessMessage(null);
        onRequestClose();
      }, 3000); // Mensaje visible por 3 segundos
    }
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
        {errorMessage && (
          <div className="assignPinModal__error">{errorMessage}</div>
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
