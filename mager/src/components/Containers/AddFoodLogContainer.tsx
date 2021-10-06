import { Flex, HStack, useCheckboxGroup, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddFoodLog } from '../../hooks/mutations';
import { EditOrAddLogContainerButton } from '../Buttons';
import { CheckboxCard } from '../Cards';
import { MainContainerLayout } from '../Layouts';
import { DefaultTimePicker } from '../TimePicker';

interface RouteParams {
  group_id: string;
}

const AddFoodLogContainer: React.FC = () => {
  const { group_id } = useParams<RouteParams>();

  const [logData, setLogData] = useState<any>(['food']);

  const businesses = ['food'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const [time, setTime] = useState<any>(new Date());

  const { mutate } = useAddFoodLog(group_id);

  return (
    <MainContainerLayout
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: 'xs',
      }}
      button={
        <EditOrAddLogContainerButton
          logData={logData}
          onClick={() => mutate({ logData, time })}
        />
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
          <DefaultTimePicker
            time={time}
            onChange={(newTime: Date) => setTime(newTime)}
          />
        </Flex>
      </VStack>
    </MainContainerLayout>
  );
};

export default AddFoodLogContainer;
