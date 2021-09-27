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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarGroup, AvatarUpload } from '../components/Avatar';
import {
  DeleteGroupButton,
  EditButtons,
  PenButton,
} from '../components/Buttons';
import {
  LogsContainer,
  FoodLogsContainer,
} from '../components/Containers';
import { Name } from '../components/Headers';
import { MainLayout } from '../components/Layouts';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../components/Layouts/Profile';
import { MembersLink, MyGroupsLink } from '../components/Links';
import { useAuth, useGroup, useLogsView, ViewType } from '../context';
import { useColors, useToast } from '../hooks';
import { GroupPageDataType, StringOrUndefined } from '../types';
import { Skeleton } from '../components/Skeleton';
import { supabase } from '../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

export const GroupPage: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const [old_group_name, setOldGroupname] = useState('');

  const {
    groupname,
    setGroupname,
    creator_id,
    setCreatorId,
    group_avatar_url,
    setGroupAvatarUrl,
  } = useGroup();

  const [isEditable, setIsEditable] = useState(false);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);
  const { showToast } = useToast();
  const { defaultColor } = useColors();
  const { view, setView } = useLogsView();

  const cancelSave = () => {
    setGroupname(old_group_name);
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

    if (groupname !== old_group_name) {
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

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
        let { data, error } = await supabase
          .from('groups')
          .select(
            `
            id,
            group_name,
            avatar_url,
            creator_id,
            profiles (id, username, avatar_url)
        `,
          )
          .eq('id', group_id)
          .single();

        let _groupData: GroupPageDataType = data;
        const { avatar_url, group_name, creator_id } = _groupData;

        setCreatorId(creator_id);
        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
        setOldGroupname(group_name);

        if (error) throw error.message;
      } catch (error) {
        throw error;
      } finally {
        setIsGroupdataLoading(false);
      }
    };

    fetchGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            isLoading={isGroupdataLoading}
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
                    <Flex
                      display={{ sm: 'flex', lg: 'none' }}
                      w="100%"
                      h="40%"
                      justifyContent="center"
                    >
                      <DeleteGroupButton
                        user_id={user?.id}
                        group_id={group_id}
                        creator_id={creator_id}
                        isEditable={isEditable}
                      />
                    </Flex>
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
                  <NameAndAvatar
                    title={groupname}
                    avatar_url={group_avatar_url}
                    avatar="Group"
                  />
                  {user?.id === creator_id && isEditable === false ? (
                    <PenButton onClick={() => setIsEditable(true)} />
                  ) : null}
                </>
              )}
            </HeaderAvatar>
          </Skeleton>
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            w="100%"
            h="40%"
            justifyContent="center"
          >
            <DeleteGroupButton
              user_id={user?.id}
              group_id={group_id}
              creator_id={creator_id}
              isEditable={isEditable}
            />
          </Flex>
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
                        mt: { base: 0, sm: '2' },
                        alignItems: 'center',
                        size: 'sm',
                      }}
                      onCrossClick={cancelSave}
                      onCheckClick={submitSave}
                    />
                  ) : null}
                </VStack>
              </HStack>
            ) : (
              <Flex
                flexDirection="row"
                display={{ base: 'flex', sm: 'none' }}
                alignItems="center"
              >
                <Box mr={2}>
                  <AvatarGroup src={group_avatar_url} />
                </Box>

                <Name
                  title={groupname}
                  textProps={{
                    fontSize: '4xl',
                  }}
                />
                {user?.id === creator_id && isEditable === false ? (
                  <PenButton onClick={() => setIsEditable(true)} />
                ) : null}
              </Flex>
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
            <LogsContainer />
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
