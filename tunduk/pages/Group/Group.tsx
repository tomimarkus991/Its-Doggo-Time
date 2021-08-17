import {
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AvatarGroup, AvatarUpload } from '../../components/Avatar';
import EditButtons from '../../components/Buttons/EditButtons';
import { LogsContainer } from '../../components/Containers';
import { Name } from '../../components/Headers';
import { DoggoIcon } from '../../components/Icons/Doggo';
import MainLayout from '../../components/Layouts/MainLayout';
import { MembersLink, MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import { GroupPageDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

const Group: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const toast = useToast();
  const router = useHistory();
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [old_group_name, setOldGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();
  const [isEditable, setIsEditable] = useState(false);
  // const [groupMembers, setGroupMembers] = useState<any>([]);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);

  const penColor = useColorModeValue('#2A2828', '#E5E0D5');

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
      alert(error.message);
    } finally {
      toast({
        title: 'Group Updated',
        description: 'Your Group has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const deleteGroup = async () => {
    // kustuta kõik grupi id-ga seostuvad invited
    // kustuta kõik grupi id-ga seostuvad logid
    // kustuta kõik grupi id-ga seostuvad memberid
    // kustuta grupp
    try {
      await supabase
        .from('invites')
        .delete()
        .eq('group_id', group_id)
        .then(
          async () =>
            await supabase
              .from('logs')
              .delete()
              .eq('group_id', group_id)
              .then(
                async () =>
                  await supabase
                    .from('members')
                    .delete()
                    .eq('group_id', group_id)
                    .then(
                      async () =>
                        await supabase
                          .from('groups')
                          .delete()
                          .eq('id', group_id),
                    ),
              ),
        );
    } catch (error) {
      throw error;
    } finally {
      router.push('/');
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
        alert(error.message);
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
      alert(error.message);
    } finally {
      toast({
        title: 'Group Picture Updated',
        description: 'Your Group Picture has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <MainLayout
      leftSide={
        <Flex flexDirection="column" w="100%" h="100%">
          <Skeleton
            isLoading={isGroupdataLoading}
            props={{
              borderRadius: 100,
              w: '100%',
              h: 'fit-content',
            }}
          >
            <Flex
              id="flex1"
              flexDirection={{ sm: 'row', lg: 'column' }}
              ml={{ sm: '6', lg: 'none' }}
              mr={{ sm: '4', md: '6', lg: 'none' }}
              mt={{ sm: '6', lg: 'none' }}
              justifyContent={{ sm: 'flex-start' }}
              alignItems={{ sm: 'center' }}
            >
              <Flex
                id="flex2"
                justifyContent="center"
                alignItems="center"
                flexDirection={{
                  base: 'row',
                  lg: 'column',
                }}
              >
                <VStack>
                  <AvatarGroup src={group_avatar_url as string} />
                  {isEditable ? (
                    <>
                      <AvatarUpload
                        onUpload={(url: string) => {
                          setGroupAvatarUrl(url);
                          updateGroupPicture(url);
                        }}
                        title={'Update Photo'}
                      />
                      {/* this is delete group button */}
                      <Flex
                        display={{ sm: 'flex', lg: 'none' }}
                        w="100%"
                        h="40%"
                        justifyContent="center"
                      >
                        <Flex alignSelf="flex-end">
                          {user?.id === creator_id && isEditable ? (
                            <Button
                              onClick={deleteGroup}
                              colorScheme="red"
                              textTransform="uppercase"
                              borderRadius="50"
                            >
                              Delete group
                            </Button>
                          ) : null}
                        </Flex>
                      </Flex>
                    </>
                  ) : null}
                </VStack>

                {isEditable ? (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={{
                      base: 'row',
                      sm: 'column',
                    }}
                  >
                    <Input
                      variant={'removeDefault'}
                      autoCapitalize="off"
                      onChange={e => setGroupname(e.target.value)}
                      value={group_name as string}
                      isDisabled={!isEditable}
                      borderRadius="50"
                      fontSize="3xl"
                      size="lg"
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
                  </Flex>
                ) : (
                  <HStack
                    ml={{ base: '4', lg: '0' }}
                    flex={1}
                    position="relative"
                  >
                    <Name title={group_name} />
                    {/* this is edit group info button */}
                    {user?.id === creator_id && isEditable === false ? (
                      <IconButton
                        onClick={() => setIsEditable(true)}
                        position="absolute"
                        right={-12}
                        aria-label="Edit"
                        bgColor="transparent"
                        _hover={{ bgColor: 'transparent' }}
                        icon={
                          <FontAwesomeIcon
                            icon={faPen}
                            size={'lg'}
                            color={penColor}
                          />
                        }
                      />
                    ) : null}
                  </HStack>
                )}
              </Flex>
              <Spacer
                display={{ base: 'none', md: 'block', lg: 'none' }}
              />
              <DoggoIcon
                display={{ base: 'none', md: 'block', lg: 'none' }}
                fontSize={{ sm: '10rem' }}
              />
            </Flex>
          </Skeleton>
          {/* this is delete group button */}
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            w="100%"
            h="40%"
            justifyContent="center"
          >
            <Flex alignSelf="flex-end">
              {user?.id === creator_id && isEditable ? (
                <Button
                  onClick={deleteGroup}
                  colorScheme="red"
                  textTransform="uppercase"
                  borderRadius="50"
                >
                  Delete group
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
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
              justifyContent="flex-start"
              alignItems="center"
              display={{ base: 'flex', sm: 'none' }}
            >
              <AvatarGroup src={group_avatar_url as string} />
              {isEditable ? (
                <VStack>
                  <AvatarUpload
                    onUpload={(url: string) => {
                      setGroupAvatarUrl(url);
                      updateGroupPicture(url);
                    }}
                    title={'Update Photo'}
                  />
                  <Input
                    variant={'removeDefault'}
                    autoCapitalize="off"
                    onChange={e => setGroupname(e.target.value)}
                    value={group_name as string}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    bg="white"
                    mr="4"
                    width={{ base: '3xs', xl: '2xs' }}
                  />
                  <EditButtons
                    buttonGroupProps={{
                      mt: { base: 0, lg: '2' },
                      alignItems: 'center',
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                </VStack>
              ) : (
                <HStack ml="4" flex={1}>
                  <Name title={group_name} />
                  {/* this is edit group info button */}
                  {user?.id === creator_id && isEditable === false ? (
                    <IconButton
                      onClick={() => setIsEditable(true)}
                      aria-label="Edit"
                      bgColor="transparent"
                      _hover={{ bgColor: 'transparent' }}
                      icon={
                        <FontAwesomeIcon
                          icon={faPen}
                          size={'lg'}
                          color={penColor}
                        />
                      }
                    />
                  ) : null}
                </HStack>
              )}
            </HStack>

            <Heading textAlign="center" fontSize={{ base: '4xl' }}>
              Overview
            </Heading>
            <LogsContainer />
            {/* this is delete group button */}
            <Flex
              display={{ base: 'flex', sm: 'none' }}
              w="100%"
              h="40%"
              justifyContent="center"
            >
              <Flex alignSelf="flex-end">
                {user?.id === creator_id && isEditable ? (
                  <Button
                    onClick={deleteGroup}
                    colorScheme="red"
                    textTransform="uppercase"
                    borderRadius="50"
                  >
                    Delete group
                  </Button>
                ) : null}
              </Flex>
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
