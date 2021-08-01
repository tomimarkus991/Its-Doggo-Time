import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { LogsdataType } from '../../types';
import { PoopIcon, PeeIcon } from '../Icons/Dutys';

interface Props {
  log: LogsdataType;
}

export const LogCard: React.FC<Props> = ({ log }) => {
  const { pee, poop, created_at } = log;
  // useEffect(() => {
  //   moment.locale('en-gb');
  //   console.log(moment.locale());
  // }, []);
  return (
    <Box>
      <VStack>
        <Flex flexDirection="row">
          {pee && <PeeIcon width="28" height="28" />}
          {poop && <PoopIcon width="28" height="28" />}
        </Flex>
        <Text fontSize="2xl">
          {moment(created_at).locale('en-gb').calendar(null, {
            lastDay: '[Yesterday at] HH:mm',
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            lastWeek: '[last] dddd [at] HH:mm',
            nextWeek: 'dddd [at] HH:mm',
            sameElse: 'DD.MM.YY [at] HH:mm',
          })}
        </Text>
        {/* <Text fontSize="2xl">{moment(created_at, 'MMMM dddd, h:mm')}</Text> */}
      </VStack>
    </Box>
  );
};
