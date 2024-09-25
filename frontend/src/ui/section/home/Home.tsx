import { TabPanel } from "../../components/tab-panel/TabPanel";
import PinList from "../../section/home/pin-list/PinList";
import EmployeeList from "../../components/employee-list/EmployeeList";

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
