import { TabPanel } from "src/ui/components/tab-panel/TabPanel.tsx";
import PinList from "@/ui/section/home/pin-list/PinList";
import EmployeeList from "src/ui/components/employee-list/EmployeeList.tsx";

const Home = () => {
  const tabs = [
    { label: "List of Pins", content: <PinList /> },
    { label: "Employees", content: <EmployeeList /> },
  ];

  return (
    <div className="home">
      <TabPanel tabs={tabs} />
    </div>
  );
};

export default Home;
