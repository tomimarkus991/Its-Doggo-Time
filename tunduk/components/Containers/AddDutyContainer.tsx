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
      mainH="lg"
      isLoading={isLoading}
      containerProps={{ w: '2xl', h: 'lg' }}
    >
      <VStack flex={1} spacing={0}>
        <AvatarInvite src={groupdata?.avatar_url as string} />
        <Name title={groupdata?.group_name} textProps={{ fontSize: 30 }} />
        <Box>
          <VStack mt={4}>
            <CheckboxGroup onChange={(value: string[]) => setDutys(value)}>
              <HStack>
                <Checkbox value="pee">
                  <PeeIcon w="8rem" h="8rem" />
                </Checkbox>
                <Checkbox value="poop">
                  <PoopIcon w="8rem" h="8rem" />
                </Checkbox>
              </HStack>
            </CheckboxGroup>
            <Box>
              <IconButton
                onClick={() => addDuty()}
                mt={4}
                h="100%"
                aria-label="Remove User"
                bgColor="transparent"
                _hover={{ bgColor: 'transparent' }}
                icon={<AddDutyInputIcon w="5rem" h="5rem" />}
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </MainContainerLayout>
  );
};