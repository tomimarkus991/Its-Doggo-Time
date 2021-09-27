import React from 'react';
import { CreateGroupContainer } from '../../components/Containers';
import {
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
} from '../../components/Layouts';
import {
  ProfileNameAndAvatar,
  ProfileNameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { ProfileAndMyGroups } from '../../components/Links';
import { Skeleton } from '../../components/Skeleton';
import { useFetchUserProfile } from '../../hooks/api';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
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
            <ProfileNameAndAvatar />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <ProfileNameAndAvatarMiddle />
          <PageHeaderBack>Create a group</PageHeaderBack>
          <CreateGroupContainer />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default CreateGroup;
