import { useState } from "react";
import { useParams } from "react-router-dom";
import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import "@/ui/section/pin-detail/PinDetail.scss";
import NotFound from "@/ui/section/not-found/NotFound";
import AssignPinModal from "@/ui/modal/AssignPinModal";
import useEmployees from "@/ui/hooks/useEmployees";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PinDetail() {
  const { pinId } = useParams<{ pinId: string }>();
  const pin = pinMock.find((p) => p.id === pinId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assignPin } = useEmployees();

  if (!pin) {
    return <NotFound />;
  }

  const handleAssignPin = async (employeeIds: string[]) => {
    const pinData = {
      type: pin.pinTitle,
      date_hire: new Date().toISOString().split("T")[0],
      color: "",
      imagePin: pin.imagePin, 
    };

    try {
      for (const employeeId of employeeIds) {
        console.log('Assigning pin:', pinData, 'to employee:', employeeId); // Log de depuración
        await assignPin(employeeId, pinData);
      }
      toast.success("Pin assigned successfully");
    } catch (error) {
      toast.error("Failed to assign pin");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="pinDetail">
      <PinCard pin={pin} isButtonVisible={false} />
      <div className="pinDetail__description">{pin.pinDescription}</div>
      <button
        className="pinDetail__button"
        onClick={() => setIsModalOpen(true)}
      >
        Assign Pin
      </button>
      <AssignPinModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAssign={handleAssignPin}
      />
    </div>
  );
}
