import { useState } from "react";
import { useParams } from "react-router-dom";
import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import NotFound from "@/ui/section/not-found/NotFound";
import useEmployees from "@/ui/hooks/useEmployees";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PinDetailPage.scss";

export default function PinDetailPage() {
  const { pinId } = useParams<{ pinId: string }>();
  const pin = pinMock.find((p) => p.id === pinId);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { employees, assignPin } = useEmployees();

  if (!pin) {
    return <NotFound />;
  }

  const handleAssignPin = async () => {
    const pinData = {
      type: pin.pinTitle,
      date_hire: new Date().toISOString().split("T")[0],
      color: "",
      imagePin: pin.imagePin,
    };

    try {
      for (const employeeId of selectedEmployees) {
        console.log("Assigning pin:", pinData, "to employee:", employeeId);
        await assignPin(employeeId, pinData);
      }
      toast.success("Pin assigned successfully");
      setSelectedEmployees([]);
    } catch (error) {
      toast.error("Failed to assign pin");
    }
  };

  const handleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        return [...prevSelected, employeeId];
      }
    });
  };

  const handleCancel = () => {
    setSelectedEmployees([]);
  };

  return (
    <div className="pinDetailPage">
      <PinCard pin={pin} isButtonVisible={false} />
      <div className="pinDetailPage__description">{pin.pinDescription}</div>
      <div className="pinDetailPage__assignSection">
        <h2>Assign pin to employee:</h2>
        <div className="pinDetailPage__employeeList">
          {employees.map((employee) => (
            <div key={employee.id} className="pinDetailPage__employeeItem">
              <img
                src={employee.picture}
                alt={employee.name}
                className="pinDetailPage__employeeAvatar"
              />
              <span>{employee.name}</span>
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleEmployeeSelection(employee.id)}
              />
            </div>
          ))}
        </div>
        {selectedEmployees.length > 0 && (
          <div className="pinDetailPage__buttonGroup">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleAssignPin}>Assign</button>
          </div>
        )}
      </div>
    </div>
  );
}
