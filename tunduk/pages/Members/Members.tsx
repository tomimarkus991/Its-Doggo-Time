import { CheckIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AvatarGroup } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import { Heading, Name } from '../../components/Headers';
import { AddMemberIcon } from '../../components/Icons/Doggo';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts/MainLayout';
import { MyGroupsLink, ProfileLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
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
  const [profiles, setProfiles] = useState<ProfileType[]>();
  const [inviteReceiver, setInviteReceiver] = useState<string | null>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();

  const [isInvalid, setIsInvalid] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);
  const [isAddMemberDisabled, setIsAddMemberDisabled] =
    useState<boolean>(false);

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
      const { avatar_url, group_name, creator_id, profiles } = _groupData;

      setCreatorId(creator_id);
      setGroupname(group_name);
      setGroupAvatarUrl(avatar_url);
      setProfiles(profiles);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsGroupdataLoading(false);
    }
  };

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
      alert(error.message);
    } finally {
      setIsGroupdataLoading(false);
    }
  };

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

  const howManyMembersGroupHas = () => {
    if (profiles?.length === 9) {
      setIsAddMemberDisabled(true);
    }
  };

  useEffect(() => {
    const listenForMemberInserts = () => {
      // when you are inserted to members
      // (by accepting invite or directly from database)
      supabase
        // only show it to members with this group_id
        .from(`members:group_id=eq.${group_id}`)
        .on('INSERT', async payload => {
          let { data: profile } = await supabase
            .from('profiles')
            .select(
              `
            id,
            username,
            avatar_url
        `,
            )
            .eq('id', payload.new.profile_id)
            .single();

          const { id, username, avatar_url } = profile as ProfileType;

          const newProfile: ProfileType = {
            id,
            username,
            avatar_url,
          };
          // update frontend with new data
          setProfiles((oldData: any) => [...oldData, newProfile]);
        })
        .subscribe();
    };
    const listenForMemberDeletes = () => {
      supabase
        .from(`members:group_id=eq.${group_id}`)
        .on('DELETE', () => {
          fetchUpdatedMembers();
        })
        .subscribe();
    };
    listenForMemberInserts();
    listenForMemberDeletes();
    fetchGroupData();
  }, []);

  useEffect(() => {
    howManyMembersGroupHas();
  }, [profiles]);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{ borderRadius: 100 }}
        >
          <VStack>
            <AvatarGroup src={group_avatar_url as string} />
            <Name title={group_name} />
            <>
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
                      color="#2A2828"
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
            </>
          </VStack>
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <HStack w="50%" m="auto">
              <Box>
                <BackIcon
                  w="10"
                  h="10"
                  cursor="pointer"
                  onClick={() => router.goBack()}
                />
              </Box>
              <Box pl="24">
                <Heading title="Members" fontSize={50} />
              </Box>
            </HStack>
          </Box>
          <MembersContainer
            members={profiles}
            isEditable={isEditable}
            group_id={group_id}
            creator_id={creator_id}
            AddNewMember={
              <>
                <IconButton
                  onClick={onOpen}
                  aria-label="Add new doggo group"
                  size="sm"
                  w="100%"
                  h="100%"
                  p={2}
                  borderRadius="100"
                  isDisabled={isAddMemberDisabled}
                  bgColor="transparent"
                  _hover={{ bgColor: 'transparent' }}
                  icon={<AddMemberIcon width="28" height="28" />}
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
                  <ModalContent borderRadius={20}>
                    <ModalHeader
                      textTransform="uppercase"
                      textAlign="center"
                    >
                      Add a member
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {isInvalid ? (
                        <Alert
                          status="error"
                          variant="subtle"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          mb={4}
                        >
                          <AlertIcon />
                          <AlertTitle mt={4} mb={1} fontSize="lg">
                            FRIEND REQUEST FAILED
                          </AlertTitle>
                          <AlertDescription maxWidth="sm">
                            Hm, that didn&#39;t work. Double check that the
                            capitalization, spelling, any spaces, and
                            numbers are correct.
                          </AlertDescription>
                          <GradientButton
                            onClick={() => setIsInvalid(false)}
                            mt={2}
                          >
                            <GradientButtonText fontSize={20}>
                              Ok
                            </GradientButtonText>
                          </GradientButton>
                        </Alert>
                      ) : null}

                      <Input
                        isInvalid={isInvalid}
                        errorBorderColor="crimson"
                        placeholder="Username"
                        color="gray.800"
                        _placeholder={{ color: 'gray.800' }}
                        borderColor="beez.700"
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
        </Box>
      }
      rightSide={
        <>
          <MyGroupsLink />
          <ProfileLink />
        </>
      }
    />
  );
};
export default Members;
