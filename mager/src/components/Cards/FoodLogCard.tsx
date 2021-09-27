import { Center, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FoodLogsdataType } from '../../types';
import { FoodIcon } from '../Icons';

interface Props {
  log: FoodLogsdataType;
  group_id: string;
}

const FoodLogCard: React.FC<Props> = ({ log, group_id }) => {
  const { id, created_at } = log;

  return (
    <Link to={`/group/${group_id}/log/${id}`}>
      <Center id="LogCard" h="100%" flexDirection="column">
        <FoodIcon
          fontSize={{
            base: '6rem',
            sm2: '6.5rem',
            md: '7.5rem',
            lg: '7rem',
            xl: '7.5rem',
          }}
        />

        <Text
          textAlign="center"
          fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
          minH="3rem"
        >
          {moment(created_at).local().calendar(null, {
            lastDay: '[Yesterday at] HH:mm',
            sameDay: '[Today at] HH:mm',
            lastWeek: 'DD.MM [at] HH:mm',
            sameElse: 'DD.MM [at] HH:mm',
          })}
        </Text>
      </Center>
    </Link>
  );
};

export default FoodLogCard;
