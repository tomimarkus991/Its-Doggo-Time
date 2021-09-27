import { createContext, useState, useContext } from 'react';
import { ExcrementLogsdataType, FoodLogsdataType } from '../types';

type InitialContextType = {
  excrementLogs: ExcrementLogsdataType[];
  setExcrementLogs: React.Dispatch<
    React.SetStateAction<ExcrementLogsdataType[]>
  >;
  foodLogs: FoodLogsdataType[];
  setFoodLogs: React.Dispatch<React.SetStateAction<FoodLogsdataType[]>>;
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
  const [excrementLogs, setExcrementLogs] = useState<
    ExcrementLogsdataType[]
  >([]);
  const [foodLogs, setFoodLogs] = useState<FoodLogsdataType[]>([]);

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
