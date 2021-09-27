import { createContext, useState, useContext } from 'react';
import { LogsdataType } from '../types';

type InitialContextType = {
  excrementLogs: LogsdataType[];
  setExcrementLogs: React.Dispatch<React.SetStateAction<LogsdataType[]>>;
  foodLogs: LogsdataType[];
  setFoodLogs: React.Dispatch<React.SetStateAction<LogsdataType[]>>;
};

const initialContext: InitialContextType = {
  excrementLogs: [],
  setExcrementLogs: () => {},
  foodLogs: [],
  setFoodLogs: () => {},
};

const LogsContext = createContext(initialContext);

export const useLogs = () => useContext(LogsContext);

const LogsDetailsProvider = ({ children }: any) => {
  const [excrementLogs, setExcrementLogs] = useState<LogsdataType[]>([]);
  const [foodLogs, setFoodLogs] = useState<LogsdataType[]>([]);

  const value = {
    excrementLogs,
    setExcrementLogs,
    foodLogs,
    setFoodLogs,
  };

  return (
    <LogsContext.Provider value={value}>{children}</LogsContext.Provider>
  );
};

export default LogsDetailsProvider;
