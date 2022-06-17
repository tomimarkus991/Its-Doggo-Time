import { Center, Flex, HStack, Input, VStack } from "@chakra-ui/react";

import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { AvatarUpload } from "../components/Avatar";
import { ChangeLogsView, DeleteGroupButton, EditButtons, PenButton } from "../components/Buttons";
import { ExcrementLogsContainer, FoodLogsContainer } from "../components/Containers";
import { HeaderAvatar, MainLayout } from "../components/Layouts";
import { GroupNameAndAvatar, GroupNameAndAvatarMiddle } from "../components/Layouts/Group";
import { MembersLink, MyGroupsLink } from "../components/Links";
import { useLogsView, ViewType } from "../context";
import { useUpdateGroupname, useUpdateGroupPicture } from "../hooks/mutations";
import { useFetchGroupData, useUser } from "../hooks/queries";

interface RouteParams {
  group_id: string;
}

export const GroupPage = () => {
  const { group_id } = useParams<RouteParams>();
  const { data: user } = useUser();
  const { view } = useLogsView();

  const [isEditable, setIsEditable] = useState(false);
  const { data } = useFetchGroupData(group_id);

  const [groupname, setGroupname] = useState(data?.group_name);

  const cancelSave = () => {
    setIsEditable(false);
    updateGroupname.reset();
    updateGroupPicture.reset();
  };

  const updateGroupPicture = useUpdateGroupPicture(group_id);
  const updateGroupname = useUpdateGroupname(group_id);

  return (
    <MainLayout
      leftSide={
        <Flex flexDir="column" w="100%" h="80%">
          <HeaderAvatar>
            {isEditable ? (
              <>
                <VStack>
                  <AvatarUpload
                    onUpload={(url: string) => {
                      updateGroupPicture.mutate(url);
                    }}
                    avatar_url={data?.avatar_url}
                    avatar="Group"
                  />
                  <Center display={{ sm: "flex", lg: "none" }} w="100%" h="40%">
                    <DeleteGroupButton
                      user_id={user?.id}
                      group_id={group_id}
                      creator_id={data?.creator_id}
                      isEditable={isEditable}
                    />
                  </Center>
                </VStack>
                <VStack>
                  <Input
                    variant={"removeDefault"}
                    autoCapitalize="off"
                    onChange={e => setGroupname(e.target.value)}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    defaultValue={data?.group_name}
                    width={{ base: "3xs", xl: "2xs" }}
                  />
                  {user?.id === data?.creator_id && (
                    <EditButtons
                      buttonGroupProps={{
                        mt: { base: 0, sm: "2" },
                        alignItems: "center",
                        size: "sm",
                      }}
                      onCrossClick={cancelSave}
                      onCheckClick={() => {
                        setIsEditable(false);
                        updateGroupname.mutate(groupname);
                      }}
                    />
                  )}
                </VStack>
              </>
            ) : (
              <>
                <GroupNameAndAvatar
                  group_id={group_id}
                  isGroupnameLoading={updateGroupname.isLoading}
                  isGroupPictureLoading={updateGroupPicture.isLoading}
                />
                {user?.id === data?.creator_id && isEditable === false && (
                  <PenButton onClick={() => setIsEditable(true)} />
                )}
              </>
            )}
          </HeaderAvatar>

          <Center display={{ base: "none", lg: "flex" }} w="100%" h="40%">
            <DeleteGroupButton
              user_id={user?.id}
              group_id={group_id}
              creator_id={data?.creator_id}
              isEditable={isEditable}
            />
          </Center>
        </Flex>
      }
      middle={
        <>
          <Flex display={{ base: "flex", sm: "none" }} flexDirection="row">
            {isEditable ? (
              <HStack>
                <AvatarUpload
                  onUpload={(url: string) => {
                    updateGroupPicture.mutate(url);
                  }}
                  avatar_url={data?.avatar_url}
                  avatar="Group"
                />
                <VStack>
                  <Input
                    variant={"removeDefault"}
                    autoCapitalize="off"
                    onChange={e => setGroupname(e.target.value)}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    defaultValue={data?.group_name}
                    width={{ base: "3xs", xl: "2xs" }}
                  />
                  {user?.id === data?.creator_id && (
                    <EditButtons
                      buttonGroupProps={{
                        size: "sm",
                      }}
                      onCrossClick={cancelSave}
                      onCheckClick={() => updateGroupname.mutate(groupname)}
                    />
                  )}
                </VStack>
              </HStack>
            ) : (
              <Center>
                <GroupNameAndAvatarMiddle
                  group_id={group_id}
                  isGroupnameLoading={updateGroupname.isLoading}
                  isGroupPictureLoading={updateGroupPicture.isLoading}
                />
                {user?.id === data?.creator_id && isEditable === false && (
                  <PenButton onClick={() => setIsEditable(true)} />
                )}
              </Center>
            )}
          </Flex>

          <VStack spacing={4}>
            <ChangeLogsView />
            {isEditable && (
              <Center display={{ base: "flex", sm: "none" }}>
                <DeleteGroupButton
                  user_id={user?.id}
                  group_id={group_id}
                  creator_id={data?.creator_id}
                  isEditable={isEditable}
                />
              </Center>
            )}
          </VStack>
          {view === ViewType.Excrement ? <ExcrementLogsContainer /> : <FoodLogsContainer />}
        </>
      }
      rightSide={
        <>
          <MembersLink group_id={group_id} />
          <MyGroupsLink />
        </>
      }
    />
  );
};
