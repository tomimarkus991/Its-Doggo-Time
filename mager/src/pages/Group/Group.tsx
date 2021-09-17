import {
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarGroup } from '../../components/Avatar';
import AvatarUpload from '../../components/Avatar/AvatarUpload/index';
import DeleteGroupButton from '../../components/Buttons/DeleteGroupButton';
import EditButtons from '../../components/Buttons/EditButtons';
import EditGroupInfoButton from '../../components/Buttons/EditButtons/EditGroupInfoButton';
import { LogsContainer } from '../../components/Containers';
import { Name } from '../../components/Headers';
import MainLayout from '../../components/Layouts/MainLayout';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../../components/Layouts/Profile';
import { MembersLink, MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import useToast from '../../hooks/useToast';
import { GroupPageDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

const Group: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [old_group_name, setOldGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();
  const [isEditable, setIsEditable] = useState(false);
  // const [groupMembers, setGroupMembers] = useState<any>([]);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);
  const { showToast } = useToast();

  const cancelSave = () => {
    setGroupname(old_group_name);
    setIsEditable(false);
  };
  const submitSave = async () => {
    setIsEditable(false);
    const updates = {
      id: group_id,
      group_name,
      avatar_url: group_avatar_url,
      updated_at: new Date(),
    };

    try {
      let { error } = await supabase.from('groups').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });
      setOldGroupname(group_name);
      if (error) throw error.message;
    } catch (error) {
      throw error;
    } finally {
      showToast({
        title: 'Group Updated',
        description: 'Your Group has been updated.',
      });
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
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
            h: '80%',
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
                    value={group_name as string}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    width={{ base: '3xs', xl: '2xs' }}
                  />
                  {user?.id === creator_id && isEditable ? (
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
                  title={group_name}
                  avatar_url={group_avatar_url}
                  avatar="Group"
                />
                <EditGroupInfoButton
                  user_id={user?.id}
                  creator_id={creator_id}
                  isEditable={isEditable}
                  setIsEditable={setIsEditable}
                />
              </>
            )}
          </HeaderAvatar>
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
        </Skeleton>
      }
      middle={
        <VStack id="5" h={{ base: '100%' }}>
          <Grid
            h={{ base: '100%' }}
            templateRows={{
              base: '0.4fr 0.1fr 1fr 0.1fr',
              sm: '0.2fr 1fr',
            }}
          >
            <HStack
              justifyContent="center"
              alignItems="center"
              display={{ base: 'flex', sm: 'none' }}
            >
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
                      value={group_name as string}
                      isDisabled={!isEditable}
                      borderRadius="50"
                      fontSize="3xl"
                      size="lg"
                      mt="4"
                      bg="white"
                      width={{ base: '3xs', xl: '2xs' }}
                    />
                    {user?.id === creator_id && isEditable ? (
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
                <HStack>
                  <AvatarGroup src={group_avatar_url} />
                  <HStack flex={1}>
                    <Name title={group_name} />
                    <EditGroupInfoButton
                      user_id={user?.id}
                      creator_id={creator_id}
                      isEditable={isEditable}
                      setIsEditable={setIsEditable}
                    />
                  </HStack>
                </HStack>
              )}
            </HStack>

            <Heading textAlign="center" fontSize={{ base: '4xl' }}>
              Overview
            </Heading>
            <LogsContainer />
            <Flex
              display={{ base: 'flex', sm: 'none' }}
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
          </Grid>
        </VStack>
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
export default Group;
