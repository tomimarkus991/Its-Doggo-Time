import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AvatarGroup } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import { Heading, Name } from '../../components/Headers';
import { BackIcon } from '../../components/Icons/LightMode';
import { TopMainBar } from '../../components/Layouts';
import MainLayout from '../../components/Layouts/MainLayout';
import { MyGroupsLink, ProfileLink } from '../../components/Links';
import {
  GroupPageDataType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { supabase } from '../../utils/supabaseClient';
interface RouteParams {
  id: string;
}
const Members: React.FC = () => {
  const borderColor = useColorModeValue('gray.800', 'white');
  const { id } = useParams<RouteParams>();
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();
  const [memberProfiles, setMemberProfiles] = useState<ProfileType[]>();
  const [inviteReceiver, setInviteReceiver] = useState<string | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvalid, setIsInvalid] = useState(false);
  const [user] = useState<User | null>(supabase.auth.user());

  const router = useHistory();

  const fetchGroupData = async () => {
    try {
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
        .eq('id', id);
      if (!data) throw error;
      let _groupData: GroupPageDataType = data[0];
      const { avatar_url, group_name, creator_id, profiles } = _groupData;

      setCreatorId(creator_id);
      setGroupname(group_name);
      setGroupAvatarUrl(avatar_url);
      setMemberProfiles(profiles);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
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
          group_id: id,
        };

        const { error } = await supabase
          .from('invites')
          .insert(values, { returning: 'minimal' });

        if (error) throw error;
        setInviteReceiver(null);
        onClose();
      }

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  const AddNewMember = () => {
    return (
      <>
        {creator_id === user?.id ? (
          <GradientButton onClick={onOpen}>Add New Member</GradientButton>
        ) : null}

        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setIsInvalid(false);
          }}
          size="xs"
        >
          <ModalOverlay />
          <ModalContent borderRadius={20}>
            <ModalHeader textAlign="center">Add a member</ModalHeader>
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
                    Hm, that didn't work. Double check that the
                    capitalization, spelling, any spaces, and numbers are
                    correct.
                  </AlertDescription>
                  <Button
                    onClick={() => setIsInvalid(false)}
                    colorScheme="blue"
                    mt={2}
                  >
                    Okay
                  </Button>
                </Alert>
              ) : null}

              <Input
                isInvalid={isInvalid}
                errorBorderColor="crimson"
                borderColor="beez.900"
                borderRadius={20}
                onChange={e => setInviteReceiver(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <GradientButton onClick={sendInvite}>Add</GradientButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <MainLayout
      leftSide={
        <>
          <AvatarGroup src={group_avatar_url} />
          <Name title={group_name} />
        </>
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
                <Heading title="Members" />
              </Box>
            </HStack>
          </Box>
          <MembersContainer
            members={memberProfiles as ProfileType[]}
            AddNewMember={() => <AddNewMember />}
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
