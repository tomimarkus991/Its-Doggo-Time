import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { LogsdataType } from '../../types';
import { PoopIcon, PeeIcon, PeeAndPoopIcon } from '../Icons/Logs';

interface Props {
  log: LogsdataType;
}

export const LogCard: React.FC<Props> = ({ log }) => {
  const { pee, poop, created_at } = log;

  return (
    <Box>
      <VStack>
        <Flex flexDirection="row">
          {pee && poop === false && (
            <PeeIcon
              fontSize={{
                base: '5.5rem',
                sm2: '6rem',
                md: '7rem',
                lg: '6.5rem',
                xl: '7rem',
              }}
            />
          )}
          {poop && pee === false && (
            <PoopIcon
              fontSize={{
                base: '5.5rem',
                sm2: '6rem',
                md: '7rem',
                lg: '6.5rem',
                xl: '7rem',
              }}
            />
          )}
          {poop && pee && (
            <PeeAndPoopIcon
              fontSize={{
                base: '6rem',
                md: '8rem',
                lg: '7.5rem',
                xl: '8rem',
              }}
            />
          )}
        </Flex>
        <Text
          textAlign="center"
          fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
        >
          {moment(created_at).local().calendar(null, {
            lastDay: '[Yesterday at] HH:mm',
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            lastWeek: '[last] dddd [at] HH:mm',
            nextWeek: 'dddd [at] HH:mm',
            sameElse: 'DD.MM.YY [at] HH:mm',
          })}
        </Text>
      </VStack>
    </Box>
  );
};
