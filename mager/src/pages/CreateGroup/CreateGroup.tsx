import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CreateGroupContainer from '../../components/Containers/CreateGroupContainer';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../../components/Layouts/Profile';
import ProfileAndMyGroups from '../../components/Links/Layout/ProfileAndMyGroups';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import { ProfileType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();

  const [username, setUsername] = useState<StringOrUndefined>();
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        setIsUserdataLoading(true);
        let { data } = await supabase
          .from('profiles')
          .select(
            `
            id,
            username,
            avatar_url
        `,
          )
          .eq('id', user?.id)
          .single();

        const _userdata: ProfileType = data;

        if (_userdata === null) return <Box>No data</Box>;

        const { username, avatar_url } = _userdata;

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
          <HeaderAvatar>
            <NameAndAvatar
              title={username}
              avatar_url={avatar_url}
              avatar="User"
            />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <VStack id="5" h="100%">
          <Grid
            h="100%"
            templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          >
            <Center>
              <HStack position="relative">
                <BackIcon
                  position="absolute"
                  left={{
                    base: '-25%',
                    md: '-27%',
                    lg: '-40%',
                  }}
                />
                <Heading fontSize={{ base: '3xl', sm: '4xl' }}>
                  Create a group
                </Heading>
              </HStack>
            </Center>
            <CreateGroupContainer isLoading={isUserdataLoading} />
          </Grid>
        </VStack>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default CreateGroup;
