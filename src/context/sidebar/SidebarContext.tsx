import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { useIsMobile } from "hooks";

type ProviderProps = {
  children: React.ReactNode;
};
type PlacementType = "left" | "right";
type SidebarStateType = "closed" | "expanded" | "small" | "openWithOverlay";

type InitialContextType = {
  sidebarState: SidebarStateType;
  setSidebarState: Dispatch<SetStateAction<SidebarStateType>>;
  placement: PlacementType;
};

const initContextData: InitialContextType = {
  placement: "right",
  sidebarState: "closed",
  setSidebarState: () => {},
};

const SidebarContext = createContext(initContextData);

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: ProviderProps) => {
  const [sidebarState, setSidebarState] = useState<SidebarStateType>("closed");
  const { isMobile } = useIsMobile();
  const placement: PlacementType = isMobile ? "right" : "left";
  return (
    <SidebarContext.Provider value={{ sidebarState, setSidebarState, placement }}>
      {children}
    </SidebarContext.Provider>
  );
};
