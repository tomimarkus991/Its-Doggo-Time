import { useParams } from "react-router-dom";

import { useFetchFoodLogs, useFoodLogsPlaceholder, useSubscribeToFoodLogInserts } from "hooks";

import {
  AddNewLogContainerButton,
  LogSummaryButton,
  FoodLogCard,
  LogGrid,
  MainContainerLayout,
  FoodLogPlaceholder,
  LogEmptyPlaceholder,
} from "components";

import { FoodLogsdataType } from "types";

export const FoodLogsContainer = () => {
  const { group_id } = useParams() as { group_id: string };
  const { data, isLoading } = useFetchFoodLogs(group_id);
  const { placeholders } = useFoodLogsPlaceholder(data);

  useSubscribeToFoodLogInserts(group_id);

  return (
    <MainContainerLayout
      isLoading={isLoading}
      button={<AddNewLogContainerButton group_id={group_id} />}
      containerProps={{
        w: {
          base: "xs",
          sm: "sm",
          sm2: "md",
          md: "lg",
          xl: "xl",
        },
        h: { base: "22rem", sm: "sm", md: "md" },
      }}
    >
      {data && !!data?.length ? (
        <LogGrid>
          {data.map((log: FoodLogsdataType, index: number) => (
            <FoodLogCard key={index} log={log} group_id={group_id} />
          ))}
          {placeholders?.map((_, index: number) => (
            <FoodLogPlaceholder key={index} />
          ))}
          <LogSummaryButton group_id={group_id} />
        </LogGrid>
      ) : (
        <LogEmptyPlaceholder />
      )}
    </MainContainerLayout>
  );
};
