import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';
import { CreateLogsdataType, GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AvatarInvite } from '../Avatar';
import { Name } from '../Headers';
import { AddDutyInputIcon, PeeIcon, PoopIcon } from '../Icons/Dutys';
import MainContainerLayout from '../Layouts/Containers';

interface Props {
  groupdata: GroupPageDataType | undefined;
  isLoading: boolean;
}

interface RouteParams {
  group_id: string;
}

export const AddDutyContainer: React.FC<Props> = ({
  groupdata,
  isLoading,
}) => {
  const [dutys, setDutys] = useState<string[]>();
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const addDuty = async () => {
    let pee: boolean;
    let poop: boolean;
    if (dutys?.includes('pee')) {
      pee = true;
    } else {
      pee = false;
    }
    if (dutys?.includes('poop')) {
      poop = true;
    } else {
      poop = false;
    }

    const values: CreateLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
    };
    try {
      await supabase.from('logs').insert(values, {
        returning: 'minimal',
      });
    } catch (error) {
      alert(error);
    } finally {
      router.push(`/group/${group_id}`);
    }
  };

  return (
    <MainContainerLayout
      mainH={{ base: 'sm', lg: 'lg' }}
      isLoading={isLoading}
      containerProps={{
        w: { base: 'xs', sm: 'sm', md: 'lg', lg: '2xl' },
        h: { base: 'sm', lg: 'md' },
      }}
      button={
        <IconButton
          onClick={() => addDuty()}
          mt={4}
          h="100%"
          aria-label="Remove User"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          icon={
            <AddDutyInputIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '7rem',
              }}
            />
          }
        />
      }
    >
      <VStack flex={1} spacing={0}>
        <AvatarInvite src={groupdata?.avatar_url as string} />
        <Name title={groupdata?.group_name} textProps={{ fontSize: 30 }} />
        <Box>
          <VStack mt={4}>
            <CheckboxGroup onChange={(value: string[]) => setDutys(value)}>
              <HStack>
                <Checkbox value="pee">
                  <PeeIcon
                    fontSize={{ base: '6rem', md: '7rem', lg: '8rem' }}
                  />
                </Checkbox>
                <Checkbox value="poop">
                  <PoopIcon
                    fontSize={{ base: '6rem', md: '7rem', lg: '8rem' }}
                  />
                </Checkbox>
              </HStack>
            </CheckboxGroup>
          </VStack>
        </Box>
      </VStack>
    </MainContainerLayout>
  );
};
