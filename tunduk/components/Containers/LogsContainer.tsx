import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { LogCard } from '../Cards';
import { Heading } from '../Headers';
import { AddDutyLink } from '../Links';
import Skeleton from '../Skeleton';

interface Props {}
interface RouteParams {
  id: string;
}

export const LogsContainer: React.FC<Props> = ({}) => {
  const { id } = useParams<RouteParams>();
  const [logsdata, setLogsdata] = useState<LogsdataType[]>();

  useEffect(() => {
    const getLogsdata = async () => {
      console.log(id);

      try {
        const { data } = await supabase
          .from('logs')
          .select(
            `
        id,
        pee,
        boop,
        created_at
        `,
          )
          .eq('group_id', id)
          .order('created_at', { ascending: true })
          .limit(12);

        if (!data) return null;
        setLogsdata(data);
      } catch (error) {}
    };

    getLogsdata();
  }, []);
  return (
    <VStack id="VStack">
      <Flex
        h="md"
        w="3xl"
        justifyContent="center"
        alignItems="center"
        borderRadius={20}
        boxShadow="xl"
        mb="1em"
        // py="4"
        flexDirection="column"
        pb="4"
      >
        {logsdata === null ||
        logsdata === undefined ||
        logsdata.length === 0 ? (
          <Center>
            <VStack textAlign="center">
              <Heading title="Log is Empty" />
              <Text fontSize="2xl" maxW="lg">
                Press the button in bottom right to add your dogs duty to
                the log
              </Text>
            </VStack>
          </Center>
        ) : (
          // <Flex>
          <SimpleGrid
            overflowY="scroll"
            columns={2}
            spacing={10}
            w="3xl"
            px="16"
          >
            {logsdata.map((log: LogsdataType, index: number) => (
              <Box key={index}>
                <LogCard log={log} />
              </Box>
            ))}
          </SimpleGrid>
          // </Flex>
        )}
      </Flex>
      <Flex w="3xl" justifyContent="flex-end">
        <AddDutyLink />
      </Flex>
    </VStack>
  );
};
