import { Center, Flex, useCheckboxGroup, VStack } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { useLogs } from "context";

import { useEditExcrementLog, useFetchExcrementLog } from "hooks";

import { EditOrAddLogContainerButton, CheckboxCard, MainContainerLayout } from "components";

import { DefaultTimePicker } from "../TimePicker";

export const EditExcrementLogContainer = () => {
  const { group_id, log_id } = useParams() as { group_id: string; log_id: string };

  const { logCheckboxData: logData, setLogCheckboxData: setLogData, time, setTime } = useLogs();

  const businesses = ["pee", "poop"];
  const { isLoading, isRefetching } = useFetchExcrementLog(log_id, group_id);

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const { mutate } = useEditExcrementLog(group_id);

  return (
    <MainContainerLayout
      isLoading={isLoading || isRefetching}
      containerProps={{
        w: { base: "xs", sm: "sm" },
        h: "xs",
      }}
      button={
        <EditOrAddLogContainerButton
          logData={logData}
          onClick={() => mutate({ logData, time, log_id })}
        />
      }
    >
      <VStack>
        <Center>
          {businesses.map((business, index: number) => {
            const checkbox = getCheckboxProps({
              value: business,
            });
            return (
              <CheckboxCard key={index} {...checkbox}>
                {business}
              </CheckboxCard>
            );
          })}
        </Center>
        <Flex w="50%">
          <DefaultTimePicker time={time} onChange={(newTime: Date) => setTime(newTime)} />
        </Flex>
      </VStack>
    </MainContainerLayout>
  );
};
