import { ExcrementLogsdataType } from "types";

type SortLogsType = {
  oldData: any;
  newLog: ExcrementLogsdataType;
};

export const sortExcrementLogs = ({ oldData, newLog }: SortLogsType) => {
  if (oldData.length <= 3) {
    const allLogs = [...oldData, newLog];
    const sortedData = allLogs.sort(
      (a, b) => new Date(a.created_at as Date).valueOf() - new Date(b.created_at as Date).valueOf()
    );
    return sortedData;
  } else {
    const newData = oldData.slice(1);
    const allLogs = [...newData, newLog];
    const sortedData = allLogs.sort(
      (a, b) => new Date(a.created_at as Date).valueOf() - new Date(b.created_at as Date).valueOf()
    );
    return sortedData;
  }
};
