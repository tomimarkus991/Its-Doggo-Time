import { Center, Flex, useCheckboxGroup, VStack } from "@chakra-ui/react";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { useAddExcrementLog } from "hooks";

import { EditOrAddLogContainerButton, CheckboxCard, MainContainerLayout } from "components";

import { DefaultTimePicker } from "../TimePicker";

export const AddExcrementLogContainer = () => {
  const { group_id } = useParams() as { group_id: string };

  const [logData, setLogData] = useState<any>([]);
  const [time, setTime] = useState(new Date());

  const businesses = ["pee", "poop"];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
  });

  const { mutate } = useAddExcrementLog(group_id);

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
        <Center>
          {businesses.map((business, index: number) => {
            const checkbox = getCheckboxProps({ value: business });
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
