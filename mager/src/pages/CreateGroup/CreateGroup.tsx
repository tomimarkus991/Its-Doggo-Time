import { Box, Center, Grid, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AvatarProfile } from '../../components/Avatar';
import CreateGroupContainer from '../../components/Containers/CreateGroupContainer';
import { Name } from '../../components/Headers';
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
        <Grid
          h={{ base: '100%', sm: '90%' }}
          templateRows={{ base: '0.4fr 0.1fr 1fr', sm: '0.2fr 1fr' }}
        >
          <Center
            flexDirection="row"
            display={{ base: 'flex', sm: 'none' }}
          >
            <Box mr={2}>
              <AvatarProfile src={avatar_url} />
            </Box>

            <Name
              title={username}
              textProps={{
                fontSize: '4xl',
              }}
            />
          </Center>
          <Center>
            <Grid
              flex={1}
              templateColumns="0.1fr 1fr"
              justifyContent="center"
              alignItems="center"
            >
              <BackIcon />
              <Heading fontSize="4xl" textAlign="center">
                Create a group
              </Heading>
            </Grid>
          </Center>

          <CreateGroupContainer />
        </Grid>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default CreateGroup;
