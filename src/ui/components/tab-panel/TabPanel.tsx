import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StoreContext } from "src/ui/components/store-context/StoreContext.tsx";
import EmployeesPanel from "src/ui/components/employee-list/EmployeeList.tsx";
import AssignPinModal from "src/ui/modal/AssignPinModal.tsx";
import "./TabPanel.scss";

interface TabPanelProps {
  tabs: {
    label: string;
    content: JSX.Element;
  }[];
}

export function TabPanel({ tabs }: TabPanelProps) {
  const {
    tab: { currentTab },
    setCurrentTab,
  } = useContext(StoreContext);

  return (
    <div className="tabPanel" data-testid="tab-panel">
      <div className="tabPanel__button-container">
        {tabs?.map((tab, index) => (
          <button
            className={`tabPanel__button ${
              currentTab === index ? "tabPanel__button--active" : ""
            }`}
            key={tab.label}
            onClick={() => {
              setCurrentTab(index);
            }}
          >
            {currentTab === index && (
              <motion.span
                layoutId="bubble"
                className="tabPanel__button-overlay"
                style={{ borderRadius: "32px" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabPanel__content">
        <AnimatePresence>
          <motion.div
            className="content"
            key={currentTab}
            initial={{ opacity: 0, x: currentTab === 0 ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          >
            {tabs[currentTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const tabs = [
  { label: "Employees", content: <EmployeesPanel /> },
  {
    label: "Assign Pin",
    content: (
      <AssignPinModal
        isOpen={true}
        onRequestClose={() => {}}
        onAssign={(id) => {}}
      />
    ),
  }, 
];

export function App() {
  return <TabPanel tabs={tabs} />;
}
