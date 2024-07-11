import { useState } from "react";
import { useParams } from "react-router-dom";
import PinCard from "@/ui/components/pin-card/PinCard";
import { pinMock } from "@/mocks/pin";
import "@/ui/section/pin-detail/PinDetail.scss";
import NotFound from "@/ui/section/not-found/NotFound";
import AssignPinModal from "@/ui/modal/AssignPinModal";
import useEmployees from "@/ui/hooks/useEmployees";

export default function PinDetail() {
  const { pinId } = useParams<{ pinId: string }>();
  const pin = pinMock.find((p) => p.id === pinId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assignPin } = useEmployees();

  if (!pin) {
    return <NotFound />;
  }

  const handleAssignPin = async (employeeId: string) => {
    await assignPin(employeeId, {
      type: pin.pinTitle,
      date_hire: new Date().toISOString().split("T")[0],
      color: "",
    });
    setIsModalOpen(false);
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
