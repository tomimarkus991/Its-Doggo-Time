import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { faBone, faPoop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarUpload } from '../components/Avatar';
import {
  DeleteGroupButton,
  EditButtons,
  PenButton,
} from '../components/Buttons';
import {
  FoodLogsContainer,
  ExcrementLogsContainer,
} from '../components/Containers';
import { HeaderAvatar, MainLayout } from '../components/Layouts';
import {
  GroupNameAndAvatar,
  GroupNameAndAvatarMiddle,
} from '../components/Layouts/Group';
import { MembersLink, MyGroupsLink } from '../components/Links';
import { Skeleton } from '../components/Skeleton';
import { useAuth, useGroup, useLogsView, ViewType } from '../context';
import { useColors, useToast } from '../hooks';
import { useFetchGroupData } from '../hooks/api';
import { StringOrUndefined } from '../types';
import { supabase } from '../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

export const GroupPage: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const {
    groupname,
    setGroupname,
    creator_id,
    group_avatar_url,
    setGroupAvatarUrl,
    old_groupname,
    setOldGroupname,
  } = useGroup();
  const { view, setView } = useLogsView();

  const { showToast } = useToast();
  const { defaultColor } = useColors();
  const [isEditable, setIsEditable] = useState(false);

  const cancelSave = () => {
    setGroupname(old_groupname);
    setIsEditable(false);
  };
  const submitSave = async () => {
    setIsEditable(false);
    const updates = {
      id: group_id,
      group_name: groupname,
      avatar_url: group_avatar_url,
      updated_at: new Date(),
    };

    if (groupname !== old_groupname) {
      try {
        let { error } = await supabase.from('groups').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });
        setOldGroupname(groupname);
        if (error) throw error.message;
      } catch (error) {
        throw error;
      } finally {
        showToast({
          title: 'Group Updated',
          description: 'Your Group has been updated.',
        });
      }
    }
  };

  const { isLoading } = useFetchGroupData(group_id);

  const updateGroupPicture = async (avatar_url: StringOrUndefined) => {
    try {
      const updates = {
        id: group_id,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('groups').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      showToast({
        title: 'Group Picture Updated',
        description: 'Your Group Picture has been updated.',
      });
    }
  };

  return (
    <MainLayout
      leftSide={
        <Flex flexDir="column" w="100%" h="80%">
          <Skeleton
            isLoading={isLoading}
            props={{
              borderRadius: 100,
            }}
          >
            <HeaderAvatar>
              {isEditable ? (
                <>
                  <VStack>
                    <AvatarUpload
                      onUpload={(url: string) => {
                        setGroupAvatarUrl(url);
                        updateGroupPicture(url);
                      }}
                      avatar_url={group_avatar_url}
                      avatar="Group"
                    />
                    <Center
                      display={{ sm: 'flex', lg: 'none' }}
                      w="100%"
                      h="40%"
                    >
                      <DeleteGroupButton
                        user_id={user?.id}
                        group_id={group_id}
                        creator_id={creator_id}
                        isEditable={isEditable}
                      />
                    </Center>
                  </VStack>
                  <VStack>
                    <Input
                      variant={'removeDefault'}
                      autoCapitalize="off"
                      onChange={e => setGroupname(e.target.value)}
                      value={groupname}
                      isDisabled={!isEditable}
                      borderRadius="50"
                      fontSize="3xl"
                      size="lg"
                      mt="4"
                      bg="white"
                      width={{ base: '3xs', xl: '2xs' }}
                    />
                    {user?.id === creator_id ? (
                      <EditButtons
                        buttonGroupProps={{
                          mt: { base: 0, sm: '2' },
                          alignItems: 'center',
                          size: 'sm',
                        }}
                        onCrossClick={cancelSave}
                        onCheckClick={submitSave}
                      />
                    ) : null}
                  </VStack>
                </>
              ) : (
                <>
                  <GroupNameAndAvatar />
                  {user?.id === creator_id && isEditable === false ? (
                    <PenButton onClick={() => setIsEditable(true)} />
                  ) : null}
                </>
              )}
            </HeaderAvatar>
          </Skeleton>
          <Center display={{ base: 'none', lg: 'flex' }} w="100%" h="40%">
            <DeleteGroupButton
              user_id={user?.id}
              group_id={group_id}
              creator_id={creator_id}
              isEditable={isEditable}
            />
          </Center>
        </Flex>
      }
      middle={
        <>
          <Flex display={{ base: 'flex', sm: 'none' }} flexDirection="row">
            {isEditable ? (
              <HStack>
                <AvatarUpload
                  onUpload={(url: string) => {
                    setGroupAvatarUrl(url);
                    updateGroupPicture(url);
                  }}
                  avatar_url={group_avatar_url}
                  avatar="Group"
                />
                <VStack>
                  <Input
                    variant={'removeDefault'}
                    autoCapitalize="off"
                    onChange={e => setGroupname(e.target.value)}
                    value={groupname}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    width={{ base: '3xs', xl: '2xs' }}
                  />
                  {user?.id === creator_id ? (
                    <EditButtons
                      buttonGroupProps={{
                        size: 'sm',
                      }}
                      onCrossClick={cancelSave}
                      onCheckClick={submitSave}
                    />
                  ) : null}
                </VStack>
              </HStack>
            ) : (
              <Center>
                <GroupNameAndAvatarMiddle />
                {user?.id === creator_id && isEditable === false ? (
                  <PenButton onClick={() => setIsEditable(true)} />
                ) : null}
              </Center>
            )}
          </Flex>

          <VStack spacing={4}>
            <HStack justifyContent="center">
              <Box
                as={FontAwesomeIcon}
                onClick={() => setView(ViewType.Excrement)}
                fontSize={{ base: '3rem', sm: '3.5rem', md: '4rem' }}
                icon={faPoop}
                color="beez.700"
                cursor="pointer"
                bgColor={defaultColor}
                py="2"
                px="2"
                borderRadius="100"
              />
              <Box
                as={FontAwesomeIcon}
                onClick={() => setView(ViewType.Food)}
                fontSize={{ base: '3rem', sm: '3.5rem', md: '4rem' }}
                icon={faBone}
                color="beez.700"
                cursor="pointer"
                bgColor={defaultColor}
                py="2"
                px="2"
                borderRadius="100"
              />
            </HStack>
            {isEditable ? (
              <Center display={{ base: 'flex', sm: 'none' }}>
                <DeleteGroupButton
                  user_id={user?.id}
                  group_id={group_id}
                  creator_id={creator_id}
                  isEditable={isEditable}
                />
              </Center>
            ) : null}
          </VStack>
          {view === ViewType.Excrement ? (
            <ExcrementLogsContainer />
          ) : (
            <FoodLogsContainer />
          )}
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
