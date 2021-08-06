import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AvatarGroup,
  AvatarProfile,
  AvatarUpload,
} from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { Name } from '../../components/Headers';
import { DoggoIcon } from '../../components/Icons/Doggo';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import { MyGroupsLink, ProfileLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import { ProfileType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const { user } = useAuth();
  const router = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<StringOrUndefined>();
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);

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

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        setIsUserdataLoading(true);
        let { data } = await supabase
          .from('profiles')
          .select(
            `
            id,
            username
        `,
          )
          .eq('id', user?.id)
          .single();

        const _userdata: ProfileType = data;

        if (_userdata === null) return <Box>No data</Box>;

        const { username } = _userdata;

        setUsername(username);
        setAvatarUrl(avatar_url);
        return <Box>Error</Box>;
      } finally {
        setIsUserdataLoading(false);
      }
    };
    fetchUserdata();
  }, []);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isUserdataLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
          }}
        >
          <Flex
            id="flex1"
            flexDirection={{ sm: 'row', lg: 'column' }}
            mx={{ sm: '6', lg: 'none' }}
            mt={{ sm: '6', lg: 'none' }}
            justifyContent={{ sm: 'flex-start' }}
            alignItems={{ sm: 'center', lg: 'flex-end' }}
          >
            <Flex
              id="flex2"
              justifyContent="center"
              alignItems="center"
              flexDirection={{ base: 'row', lg: 'column' }}
            >
              <Box mr={{ sm: '6', lg: '0' }}>
                <AvatarProfile src={avatar_url as string} />
              </Box>
              <Name title={username} />
            </Flex>
            <Spacer display={{ sm: 'initial', lg: 'none' }} />
            <DoggoIcon
              display={{ sm: 'initial', lg: 'none' }}
              fontSize={{ sm: '10rem' }}
            />
          </Flex>
        </Skeleton>
      }
      middle={
        <VStack
          id="5"
          justifyContent="center"
          alignItems="center"
          h={{ base: '100%' }}
        >
          <Grid
            h={{ base: '100%' }}
            templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          >
            <HStack
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <BackIcon
                position="absolute"
                left={{ base: '-3', sm: '4' }}
                w="10"
                h="10"
                cursor="pointer"
                onClick={() => router.goBack()}
              />
              <Heading fontSize={{ base: '4xl', sm: '4xl' }}>
                Create a Group
              </Heading>
            </HStack>
            <Center
              layerStyle="shadow-and-bg"
              bg="white"
              h="sm"
              w={{ base: 'xs', sm: 'sm', lg: 'md' }}
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
                  variant={'removeDefault'}
                  value={group_name}
                  onChange={e => setGroupname(e.target.value)}
                  isRequired
                  size="lg"
                  fontSize="2xl"
                  maxW="2xs"
                  borderRadius="25"
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
          </Grid>
        </VStack>
      }
      rightSide={
        <>
          <MyGroupsLink />
          <ProfileLink />
        </>
      }
    />
  );
};
export default CreateGroup;
