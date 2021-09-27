import React from 'react';
import { CreateGroupContainer } from '../../components/Containers';
import { MainLayout } from '../../components/Layouts';
import { PageHeaderBack } from '../../components/Layouts/Pages';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { ProfileAndMyGroups } from '../../components/Links';
import { Skeleton } from '../../components/Skeleton';
import { useUser } from '../../context';
import { useFetchUserProfile } from '../../hooks/api';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const { username, user_avatar_url } = useUser();

  const { isLoading } = useFetchUserProfile();

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
          }}
        >
          <HeaderAvatar>
            <NameAndAvatar
              title={username}
              avatar_url={user_avatar_url}
              avatar="User"
            />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <NameAndAvatarMiddle
            name={username}
            avatar_url={user_avatar_url}
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
