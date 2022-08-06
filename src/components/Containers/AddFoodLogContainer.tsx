import { Flex, HStack, useCheckboxGroup, VStack } from "@chakra-ui/react";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAddFoodLog } from "hooks";

import { EditOrAddLogContainerButton, CheckboxCard, MainContainerLayout } from "components";

import { DefaultTimePicker } from "../TimePicker";

export const AddFoodLogContainer = () => {
  const { group_id } = useParams() as { group_id: string };

  const [logData, setLogData] = useState<any>(["food"]);
  const [time, setTime] = useState<any>(new Date());

  const businesses = ["food"];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const { mutate } = useAddFoodLog(group_id);

  return (
    <MainContainerLayout
      isLoading={false}
      containerProps={{
        w: { base: "xs", sm: "sm" },
        h: "xs",
      }}
      button={
        <EditOrAddLogContainerButton logData={logData} onClick={() => mutate({ logData, time })} />
      }
    >
      <VStack>
        <HStack>
          {businesses.map((business, index: number) => {
            const checkbox = getCheckboxProps({ value: business });
            return (
              <CheckboxCard key={index} {...checkbox}>
                {business}
              </CheckboxCard>
            );
          })}
        </HStack>
        <Flex w="50%">
          <DefaultTimePicker time={time} onChange={(newTime: Date) => setTime(newTime)} />
        </Flex>
      </VStack>
    </MainContainerLayout>
  );
};
