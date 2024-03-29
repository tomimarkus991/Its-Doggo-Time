import {
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
  ProfileNameAndAvatar,
  ProfileNameAndAvatarMiddle,
  ProfileAndMyGroups,
  CreateGroupContainer,
} from "components";

export const CreateGroup = () => {
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
