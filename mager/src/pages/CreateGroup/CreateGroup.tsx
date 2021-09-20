import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CreateGroupContainer from '../../components/Containers/CreateGroupContainer';
import MainLayout from '../../components/Layouts';
import PageHeaderBack from '../../components/Layouts/Pages/PageHeaderBack';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
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
        <>
          <NameAndAvatarMiddle
            name={username}
            avatar_url={avatar_url}
            avatar="User"
          />

          <PageHeaderBack>Create a group</PageHeaderBack>

          <CreateGroupContainer />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default CreateGroup;
