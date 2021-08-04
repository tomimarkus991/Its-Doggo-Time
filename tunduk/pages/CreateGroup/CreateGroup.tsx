import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarGroup, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';

import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const { user } = useAuth();
  const router = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const createGroup = async () => {
    try {
      const updates = {
        group_name,
        avatar_url,
        creator_id: user?.id,
        updated_at: new Date(),
      };

      let { data, error } = await supabase
        .from('groups')
        .insert(updates, {
          returning: 'representation',
        })
        .single();
      try {
        setIsLoading(true);
        const memberUpdates = {
          profile_id: user?.id,
          group_id: data.id,
        };

        let { error } = await supabase
          .from('members')
          .insert(memberUpdates, {
            returning: 'minimal',
          });
        if (error) throw error.message;
      } catch (error) {
        alert(error.message);
      }

      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    } finally {
      router.push('/');
      setIsLoading(false);
    }
  };

  return (
    <MainLayout
      leftSide={
        <Flex justifyContent="flex-end" mt="12">
          <BackIcon
            w="10"
            h="10"
            cursor="pointer"
            onClick={() => router.goBack()}
          />
        </Flex>
      }
      middle={
        <Box mt="8">
          <VStack mb="8">
            <Heading fontSize={50}>Create Group</Heading>
          </VStack>
          <Center
            style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
            h="sm"
            w="md"
            borderRadius={20}
            m="auto"
          >
            <VStack spacing={4} minW="16rem">
              <AvatarGroup src={avatar_url as string} />
              <AvatarUpload
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                }}
                title="Add Photo"
              />
              <Input
                value={group_name}
                onChange={e => setGroupname(e.target.value)}
                isRequired
                size="lg"
                fontSize="2xl"
                maxW="2xs"
                borderRadius="25"
                borderColor="beez.700"
                _placeholder={{ color: 'gray.800' }}
                placeholder="Group name"
              />

              <GradientButton
                onClick={createGroup}
                isLoading={isLoading}
                loadingText="Creating"
              >
                <GradientButtonText fontSize={25}>
                  Create
                </GradientButtonText>
              </GradientButton>
            </VStack>
          </Center>
        </Box>
      }
      rightSide={null}
    />
  );
};
export default CreateGroup;
