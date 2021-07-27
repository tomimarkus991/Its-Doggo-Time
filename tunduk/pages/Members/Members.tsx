import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
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
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Name } from '../../components/Account';
import { AvatarGroup } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import { ProfileLink } from '../../components/Links';
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
  return (
    <Center>
      <Grid
        templateRows="0.4fr"
        templateAreas='"main"'
        h="100%"
        w="100%"
        maxW="6xl"
        id="membersGrid"
      >
        <GridItem gridArea="main">
          <Flex flexDir="row">
            <Flex alignItems="center">
              <AvatarGroup src={group_avatar_url} />
              <Name title={group_name} textProps={{ pl: '1em' }} />
            </Flex>
            <Spacer />
            <Flex
              alignItems="center"
              justifyItems="center"
              boxSizing="border-box"
              pr={'3em'}
              flexDirection="column"
            >
              <Text fontSize={50}>Members</Text>
              <Box
                w="125px"
                borderBottom="2px"
                borderColor={borderColor}
              />
            </Flex>
            <Spacer />
            <HStack alignItems="flex-start">
              <ProfileLink />
            </HStack>
          </Flex>
        </GridItem>
        <GridItem m="auto">
          <MembersContainer members={memberProfiles as ProfileType[]} />
          <Flex justifyContent="flex-end">
            <Box>
              {creator_id === user?.id ? (
                <GradientButton onClick={onOpen}>
                  Add New Member
                </GradientButton>
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
                  <ModalHeader textAlign="center">
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
                          Hm, that didn't work. Double check that the
                          capitalization, spelling, any spaces, and numbers
                          are correct.
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
                    <GradientButton onClick={sendInvite}>
                      Add
                    </GradientButton>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Center>
  );
};
export default Members;
