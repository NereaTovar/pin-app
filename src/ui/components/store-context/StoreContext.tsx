import { createContext, useState, ReactNode } from "react";

interface StoreContextProps {
  tab: {
    currentTab: number;
  };
  setCurrentTab: (tab: number) => void;
}

export const StoreContext = createContext<StoreContextProps>({
  tab: {
    currentTab: 0,
  },
  setCurrentTab: () => {},
});

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <StoreContext.Provider
      value={{
        tab: { currentTab },
        setCurrentTab,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
