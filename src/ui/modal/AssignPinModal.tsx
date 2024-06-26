import { useState } from "react";
import useEmployees from "@/ui/hooks/useEmployees";
import Modal from "react-modal";
import "@/ui/modal/AssignPinModal.scss";

interface AssignPinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAssign: (employeeId: string) => void;
}

const AssignPinModal = ({
  isOpen,
  onRequestClose,
  onAssign,
}: AssignPinModalProps) => {
  const { employees, loading } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found.</div>;
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="assignPinModal"
    >
      <h2>Assign Pin to Employee</h2>
      <input
        type="text"
        placeholder="Search employee"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="assignPinModal__search"
      />
      <ul className="assignPinModal__list">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="assignPinModal__item">
            <img
              src={employee.picture}
              alt={employee.name}
              className="assignPinModal__picture"
            />
            <div className="assignPinModal__details">
              <div className="assignPinModal__name">{employee.name}</div>
              <div className="assignPinModal__email">{employee.email}</div>
              <div className="assignPinModal__department">
                {employee.department}
              </div>
              <button
                onClick={() => onAssign(employee.id)}
                className="assignPinModal__assignButton"
              >
                Assign
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onRequestClose} className="assignPinModal__closeButton">
        Close
      </button>
    </Modal>
  );
};

export default AssignPinModal;
