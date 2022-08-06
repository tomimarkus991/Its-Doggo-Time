import { useParams } from "react-router-dom";

import { useFetchExcrementLogs } from "hooks";

import {
  ExcrementLogCard,
  AddNewLogContainerButton,
  LogSummaryButton,
  LogGrid,
  MainContainerLayout,
  ExcrementLogPlaceholder,
  LogEmptyPlaceholder,
} from "components";

import { useExcrementLogsPlaceholder } from "hooks/placeholders";
import { useSubscribeToExcrementLogInserts } from "hooks/subcribe";
import { ExcrementLogsdataType } from "types";

export const ExcrementLogsContainer = () => {
  const { group_id } = useParams() as { group_id: string };
  const { data, isLoading } = useFetchExcrementLogs(group_id);
  const { placeholders } = useExcrementLogsPlaceholder(data);

  useSubscribeToExcrementLogInserts(group_id);

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
          {data?.map((log: ExcrementLogsdataType, index: number) => (
            <ExcrementLogCard key={index} log={log} group_id={group_id} />
          ))}
          {placeholders?.map((_, index: number) => (
            <ExcrementLogPlaceholder key={index} />
          ))}
          <LogSummaryButton group_id={group_id} />
        </LogGrid>
      ) : (
        <LogEmptyPlaceholder />
      )}
    </MainContainerLayout>
  );
};
