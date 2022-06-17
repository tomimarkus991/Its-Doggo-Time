import { createContext, useContext, useState } from "react";

export enum ViewType {
  Excrement = "Excrement",
  Food = "Food",
}

type InitContextType = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

const initContextData: InitContextType = {
  view: ViewType.Excrement,
  setView: () => {},
};

const LogsViewContext = createContext(initContextData);

export const useLogsView = () => useContext(LogsViewContext);

export const LogsViewProvider = ({ children }: any) => {
  const [view, setView] = useState<ViewType>(ViewType.Excrement);

  const value = {
    view,
    setView,
  };
  return <LogsViewContext.Provider value={value}>{children}</LogsViewContext.Provider>;
};
