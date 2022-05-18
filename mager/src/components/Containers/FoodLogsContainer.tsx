import React from "react";
import { useParams } from "react-router-dom";

import { useFoodLogsPlaceholder } from "hooks/placeholders";
import { useFetchFoodLogs } from "hooks/queries";
import { useSubscribeToFoodLogInserts } from "hooks/subcribe/useSubscribeToFoodLogInserts";
import { FoodLogsdataType } from "types";
import { AddNewLogContainerButton, LogSummaryButton } from "../Buttons";
import { FoodLogCard } from "../Cards";
import { LogGrid } from "../Grids";
import { MainContainerLayout } from "../Layouts";
import { FoodLogPlaceholder, LogEmptyPlaceholder } from "../Placeholders";

interface RouteParams {
  group_id: string;
}

const FoodLogsContainer = () => {
  const { group_id } = useParams<RouteParams>();
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

export default FoodLogsContainer;
