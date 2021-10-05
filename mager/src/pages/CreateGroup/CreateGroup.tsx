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

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  return (
    <MainLayout
      leftSide={
        <HeaderAvatar>
          <ProfileNameAndAvatar />
        </HeaderAvatar>
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
