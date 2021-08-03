import {
  Box,
  Center,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { LogCard } from '../Cards';
import { Heading } from '../Headers';
import { AddDutyIcon } from '../Icons/Doggo';

interface Props {}
interface RouteParams {
  group_id: string;
}

export const LogsContainer: React.FC<Props> = ({}) => {
  const { group_id } = useParams<RouteParams>();
  const [logsdata, setLogsdata] = useState<LogsdataType[]>();

  useEffect(() => {
    const getLogsdata = async () => {
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
          .eq('group_id', group_id)
          .order('created_at', { ascending: true })
          .limit(12);

        if (!data) return null;
        setLogsdata(data);
        return;
      } catch (error) {
        throw error;
      }
    };

    getLogsdata();
  }, []);
  return (
    <VStack>
      <Flex
        position="relative"
        style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
        h="md"
        w="3xl"
        justifyContent="center"
        alignItems="center"
        borderRadius={20}
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
              <Heading title="Log is Empty" fontSize={50} />
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
        <Box position="absolute" right="-10" bottom="-10">
          <AddDutyLink />
        </Box>
      </Flex>
    </VStack>
  );
};
