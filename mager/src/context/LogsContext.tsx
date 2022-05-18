import { createContext, useState, useContext, SetStateAction, Dispatch } from "react";

import { ExcrementLogsdataType, FoodLogsdataType } from "../types";

type InitialContextType = {
  excrementLogs: ExcrementLogsdataType[];
  setExcrementLogs: Dispatch<SetStateAction<ExcrementLogsdataType[]>>;
  foodLogs: FoodLogsdataType[];
  setFoodLogs: Dispatch<SetStateAction<FoodLogsdataType[]>>;
  logCheckboxData: any;
  setLogCheckboxData: any;
  time: Date | null | undefined;
  setTime: Dispatch<SetStateAction<Date | null | undefined>>;
};

const initialContext: InitialContextType = {
  excrementLogs: [],
  setExcrementLogs: () => {},
  foodLogs: [],
  setFoodLogs: () => {},
  logCheckboxData: [],
  setLogCheckboxData: () => {},
  time: new Date(),
  setTime: () => {},
};

const LogsContext = createContext(initialContext);

export const useLogs = () => useContext(LogsContext);

const LogsDetailsProvider = ({ children }: any) => {
  const [excrementLogs, setExcrementLogs] = useState<ExcrementLogsdataType[]>([]);
  const [foodLogs, setFoodLogs] = useState<FoodLogsdataType[]>([]);
  const [logCheckboxData, setLogCheckboxData] = useState<any>([]);
  const [time, setTime] = useState<Date | null | undefined>(new Date());

  const value = {
    excrementLogs,
    setExcrementLogs,
    foodLogs,
    setFoodLogs,
    logCheckboxData,
    setLogCheckboxData,
    time,
    setTime,
  };

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

export default LogsDetailsProvider;
