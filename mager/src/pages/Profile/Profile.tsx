import { Center, Flex, HStack, Input, VStack } from "@chakra-ui/react";

import React, { useState } from "react";

import { AvatarUpload } from "components/Avatar";
import { EditButtons, PenButton } from "components/Buttons";
import { MyProfileContainer } from "components/Containers";
import { Invites } from "components/Invites";
import { HeaderAvatar, MainLayout, PageHeader } from "components/Layouts";
import { ProfileNameAndAvatar, ProfileNameAndAvatarMiddle } from "components/Layouts/Profile";
import { MyGroupsLink } from "components/Links";
import { useUpdateUserAvatar, useUpdateUsername } from "hooks/mutations";
import { useUser } from "hooks/queries";

const Profile: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { data } = useUser();
  const [username, setUsername] = useState(data?.username);

  const cancelSave = () => {
    setIsEditable(false);
    updateUsername.reset();
    updateUserAvatar.reset();
  };

  const updateUserAvatar = useUpdateUserAvatar();
  const updateUsername = useUpdateUsername();

  return (
    <MainLayout
      leftSide={
        <HeaderAvatar>
          {isEditable ? (
            <HStack flexDirection={{ sm: "row", lg: "column" }}>
              <AvatarUpload
                onUpload={(url: string) => {
                  updateUserAvatar.mutate(url);
                }}
                avatar_url={data?.avatar_url}
                avatar="User"
              />
              <VStack>
                <Input
                  variant={"removeDefault"}
                  autoCapitalize="off"
                  onChange={e => setUsername(e.target.value)}
                  defaultValue={data?.username}
                  isDisabled={!isEditable}
                  borderRadius="50"
                  fontSize="3xl"
                  size="lg"
                  mt="4"
                  bg="white"
                  width={{ sm: "3xs", xl: "2xs" }}
                />
                <EditButtons
                  buttonGroupProps={{
                    mt: 2,
                    size: "sm",
                  }}
                  onCrossClick={cancelSave}
                  onCheckClick={() => {
                    setIsEditable(false);
                    updateUsername.mutate(username);
                  }}
                />
              </VStack>
            </HStack>
          ) : (
            <>
              <ProfileNameAndAvatar />
              <PenButton onClick={() => setIsEditable(true)} />
            </>
          )}
        </HeaderAvatar>
      }
      middle={
        <>
          <Flex flexDirection="row" display={{ base: "flex", sm: "none" }}>
            {isEditable ? (
              <HStack>
                <AvatarUpload
                  onUpload={(url: string) => {
                    updateUserAvatar.mutate(url);
                  }}
                  avatar_url={data?.avatar_url}
                  avatar="User"
                />

                <VStack>
                  <Input
                    variant={"removeDefault"}
                    autoCapitalize="off"
                    onChange={e => setUsername(e.target.value)}
                    defaultValue={data?.username}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    width="3xs"
                  />

                  <EditButtons
                    buttonGroupProps={{
                      size: "sm",
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={() => {
                      setIsEditable(false);
                      updateUsername.mutate(username);
                    }}
                  />
                </VStack>
              </HStack>
            ) : (
              <Center>
                <ProfileNameAndAvatarMiddle />
                <PenButton onClick={() => setIsEditable(true)} />
              </Center>
            )}
          </Flex>
          <PageHeader>My Profile</PageHeader>
          <MyProfileContainer />
        </>
      }
      rightSide={
        <>
          <Invites />
          <MyGroupsLink />
        </>
      }
    />
  );
};
export default Profile;
