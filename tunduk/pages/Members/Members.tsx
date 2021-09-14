import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MembersAlert from '../../components/Alerts/MembersAlert';
import { AvatarGroup } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import { Name } from '../../components/Headers';
import { AddMemberIcon, DoggoIcon } from '../../components/Icons/Doggo';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts/MainLayout';
import ProfileAndMyGroups from '../../components/Links/Layout/ProfileAndMyGroups';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import {
  useSubscribeToMemberDeletes,
  useSubscribeToMemberInserts,
} from '../../hooks/subcribe';
import useColors from '../../hooks/useColors';
import {
  GroupPageDataType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { supabase } from '../../utils/supabaseClient';
interface RouteParams {
  group_id: string;
}
const Members: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [inviteReceiver, setInviteReceiver] = useState<string | null>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();

  const [isInvalid, setIsInvalid] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);
  const [isAddMemberDisabled, setIsAddMemberDisabled] =
    useState<boolean>(false);

  const { defaultColor, penColor } = useColors();

  const { subscribetoMemberInserts } = useSubscribeToMemberInserts({
    group_id,
    setProfiles,
  });

  const fetchUpdatedMembers = async () => {
    try {
      setIsGroupdataLoading(true);
      let { data, error } = await supabase
        .from('groups')
        .select(
          `
          id,
          profiles (id, username, avatar_url)
        `,
        )
        .eq('id', group_id)
        .single();
      let _groupData: GroupPageDataType = data;
      const { profiles } = _groupData;

      setProfiles(profiles);

      if (error) throw error.message;
    } catch (error) {
      throw error;
    } finally {
      setIsGroupdataLoading(false);
    }
  };
  const { subscribeToMemberDeletes } = useSubscribeToMemberDeletes({
    group_id,
    fetchUpdatedMembers,
  });

  const sendInvite = async () => {
    try {
      const { username } = await getCurrentUser();

      // finds if there are any members with {inviteReceiver} username
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', inviteReceiver);
      if (data?.length === 0) {
        setIsInvalid(true);
      } else {
        const values = {
          receiver: inviteReceiver,
          sender: username,
          group_id,
        };

        const { error } = await supabase
          .from('invites')
          .insert(values, { returning: 'minimal' });

        if (error) throw error.message;
        setInviteReceiver(null);
        onClose();
      }

      if (error) throw error.message;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
        let { data } = await supabase
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
        const { avatar_url, group_name, creator_id, profiles } =
          _groupData;

        setCreatorId(creator_id);
        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
        setProfiles(profiles);
      } catch (error) {
        throw error;
      } finally {
        setIsGroupdataLoading(false);
      }
    };
    subscribetoMemberInserts();
    subscribeToMemberDeletes();
    fetchGroupData();
    return () => {
      supabase.removeSubscription(subscribetoMemberInserts());
      supabase.removeSubscription(subscribeToMemberDeletes());
    };
  }, []);

  useEffect(() => {
    const howManyMembersGroupHas = () => {
      if (profiles?.length >= 6) {
        setIsAddMemberDisabled(true);
      }
    };
    howManyMembersGroupHas();
  }, [profiles]);

  const leaveGroup = async () => {
    try {
      await supabase
        .from('members')
        .delete()
        .eq('profile_id', user?.id)
        .eq('group_id', group_id)
        .then(
          async () =>
            await supabase.from('groups').delete().eq('id', group_id),
        );
    } catch (error) {
      throw error;
    } finally {
      router.push('/');
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
            h: '100%',
          }}
        >
          <Flex
            id="flex1"
            flexDirection={{ sm: 'row', lg: 'column' }}
            mx={{ sm: '6', lg: 'none' }}
            mt={{ sm: '6', lg: 'none' }}
            justifyContent="center"
            alignItems={{ sm: 'center' }}
          >
            <Flex
              id="flex2"
              justifyContent="center"
              alignItems="center"
              flexDirection={{ base: 'row', lg: 'column' }}
            >
              <Box mr={{ sm: '6', lg: '0' }}>
                <AvatarGroup src={group_avatar_url as string} />
              </Box>
              <Name
                title={group_name}
                textProps={{
                  fontSize: { base: '2xl', sm: '3xl', md: '5xl' },
                }}
              />
            </Flex>
            <Spacer display={{ sm: 'block', lg: 'none' }} />
            <DoggoIcon
              display={{ sm: 'block', lg: 'none' }}
              fontSize={{ sm: '10rem' }}
            />
          </Flex>
          {/* this is leave group button */}
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            w="100%"
            h="40%"
            justifyContent="center"
          >
            <Flex alignSelf="flex-end">
              {user?.id !== creator_id ? (
                <Button
                  onClick={leaveGroup}
                  colorScheme="red"
                  textTransform="uppercase"
                  borderRadius="50"
                >
                  Leave group
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Skeleton>
      }
      middle={
        <VStack
          id="5"
          justifyContent="center"
          alignItems="center"
          h={{ base: '100%' }}
        >
          <Grid
            h={{ base: '100%' }}
            templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          >
            <HStack
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <BackIcon
                position="absolute"
                left={10}
                w="10"
                h="10"
                cursor="pointer"
                onClick={() => router.goBack()}
              />
              <Heading fontSize={{ base: '4xl', sm: '4xl' }}>
                Members
              </Heading>
              <Box position="absolute" right={{ base: 6, sm: 10 }}>
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
                {user?.id === creator_id && isEditable ? (
                  <IconButton
                    borderRadius="50"
                    onClick={() => setIsEditable(false)}
                    aria-label="Save"
                    colorScheme="green"
                    icon={<CheckIcon color="white" />}
                  />
                ) : null}
              </Box>
            </HStack>
            <MembersContainer
              members={profiles}
              isEditable={isEditable}
              group_id={group_id}
              creator_id={creator_id}
              isLoading={isGroupdataLoading}
              AddNewMember={
                <>
                  <IconButton
                    onClick={onOpen}
                    aria-label="Add new member"
                    w="100%"
                    h="100%"
                    borderRadius="100"
                    isDisabled={isAddMemberDisabled}
                    bgColor="transparent"
                    _hover={{ bgColor: 'transparent' }}
                    icon={
                      <AddMemberIcon
                        fontSize={{
                          base: '5rem',
                          md: '7rem',
                        }}
                      />
                    }
                  />
                  <Modal
                    isOpen={isOpen}
                    onClose={() => {
                      onClose();
                      setIsInvalid(false);
                    }}
                    size="sm"
                  >
                    <ModalOverlay />
                    <ModalContent bg={defaultColor} borderRadius={20}>
                      <ModalHeader
                        textTransform="uppercase"
                        textAlign="center"
                      >
                        Add a member
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {isInvalid ? <MembersAlert /> : null}

                        <Input
                          variant={'removeDefault'}
                          autoCapitalize="off"
                          isInvalid={isInvalid}
                          errorBorderColor="crimson"
                          placeholder="Username"
                          borderRadius={20}
                          size="lg"
                          fontSize="2xl"
                          onChange={e => setInviteReceiver(e.target.value)}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <GradientButton onClick={sendInvite}>
                          <GradientButtonText fontSize={25}>
                            Invite
                          </GradientButtonText>
                        </GradientButton>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              }
            />
          </Grid>
        </VStack>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default Members;
