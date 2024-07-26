import { useState } from "react";
import Modal from "react-modal";
import useEmployees from "@/ui/hooks/useEmployees";
import "./AssignPinModal.scss";

interface AssignPinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAssign: (id: string) => void;
}

interface Pin {
  type: string;
  date_hire: string;
  color: string;
  imagePin: string;
}

const AssignPinModal = ({
  isOpen,
  onRequestClose,
  onAssign,
}: AssignPinModalProps) => {
  const { employees, loading, assignPin } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Define el pin que deseas asignar
  const pinToAssign: Pin = {
    type: "Summer Event 2024",
    date_hire: "2024-07-24",
    color: "",
    imagePin: "/src/assets/pins/Summer_event.svg",
  };

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async () => {
    let allSuccess = true;
    let errorOccurred = false;

    for (const employeeId of selectedEmployees) {
      const result = await assignPin(employeeId, pinToAssign);
      if (result === "Pin already assigned") {
        allSuccess = false;
        setErrorMessage(`El empleado ${employeeId} ya tiene asignado ese pin.`);
        setTimeout(() => setErrorMessage(null), 5000); // Mensaje visible por 5 segundos
      } else if (result === "Error") {
        allSuccess = false;
        errorOccurred = true;
        setErrorMessage(`Error al asignar el pin al empleado ${employeeId}.`);
        setTimeout(() => setErrorMessage(null), 5000); // Mensaje visible por 5 segundos
      }
    }

    if (allSuccess) {
      setSuccessMessage("Pin asignado con éxito");
      setTimeout(() => {
        setSuccessMessage(null);
        onRequestClose();
      }, 5000); // Mensaje visible por 5 segundos
    } else if (!errorOccurred) {
      setErrorMessage("Uno o más empleados ya tienen asignado ese pin.");
      setTimeout(() => setErrorMessage(null), 5000); // Mensaje visible por 5 segundos
    }

    // Llamar a la función onAssign para notificar el evento de asignación de pines
    selectedEmployees.forEach((employeeId) => {
      onAssign(employeeId);
    });
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
              className="assignPinModal__cancelButton"
              onClick={onRequestClose}
            >
              Cancel
            </button>
            <button
              className="assignPinModal__assignButton"
              onClick={handleSubmit}
            >
              Assign
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssignPinModal;
