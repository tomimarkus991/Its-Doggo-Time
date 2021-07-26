import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { InviteGroupsType, ProfileType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { Avatar, Name } from '../Account';
import { GradientButton } from '../Buttons';
import { Groups } from '../Containers';
import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';
import { UserProfileIcon } from '../Icons/Profile/UserProfileIcon';

const LoggedIn: React.FC = () => {
  const [userInvites, setUserInvites] = useState<InviteGroupsType[]>();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState<ProfileType>();

  const fetchUserGroups = async () => {
    try {
      const user: User | null = supabase.auth.user();

      let { data, error } = await supabase
        .from('profiles')
        .select(
          `
          id,
          username,
          avatar_url,
          groups (id, group_name, avatar_url, creator_id)
      `,
        )
        .eq('id', user?.id);
      if (!data) throw error;

      setUserData(data[0]);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchInvites = async () => {
    try {
      const { data, error } = await supabase
        .from('invites')
        .select(
          `
            id,
            receiver,
            sender,
            group_id,
            groups (id, group_name, avatar_url)
          `,
        )
        .eq('receiver', userData?.username);
      if (!data) throw error;
      setUserInvites(data);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const acceptInvite = async (group_id: string, invite_id: string) => {
    const user: User | null = supabase.auth.user();
    const memberUpdates = {
      profile_id: user?.id,
      group_id,
    };
    await supabase.from('members').upsert(memberUpdates, {
      returning: 'minimal',
    });

    // delete invite with that id
    await supabase.from('invites').delete().eq('id', invite_id);
  };

  const declineInvite = async (invite_id: string) => {
    // delete invite with that id
    await supabase.from('invites').delete().eq('id', invite_id);
  };

  useEffect(() => {
    fetchUserGroups();
    fetchInvites();
  }, []);

  const borderColor = useColorModeValue('beez.800', 'white');

  return (
    <Grid
      templateRows="0.4fr"
      templateAreas='"main"'
      h="100%"
      w="100%"
      maxW="6xl"
    >
      <GridItem gridArea="main">
        <Flex flexDir="row">
          <Flex alignItems="center">
            <Avatar
              src={userData?.avatar_url}
              size="2xl"
              icon={<UserProfileIcon fontSize="8.2rem" />}
            />
            <Name title={userData?.username} textProps={{ pl: '1em' }} />
          </Flex>
          <Spacer />
          <Flex
            alignItems="center"
            justifyItems="center"
            boxSizing="border-box"
            pr={'3em'}
            flexDirection="column"
          >
            <Text fontSize={50}>Groups</Text>
            <Box
              w="125px"
              borderBottom="2px"
              borderColor={borderColor}
              // ml="1em"
            />
          </Flex>
          <Spacer />
          <HStack alignItems="flex-start">
            <Box>
              <Button onClick={onOpen}>Invites</Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Invites</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {userInvites?.map(
                      (invite: InviteGroupsType, index) => {
                        return (
                          <Box key={index}>
                            <Text>{invite.groups.group_name}</Text>
                            <Avatar
                              src={invite.groups.avatar_url}
                              icon={<GroupProfileIcon fontSize="2rem" />}
                              size="sm"
                            />
                            <Button
                              onClick={() =>
                                acceptInvite(invite.groups.id, invite.id)
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => declineInvite(invite.id)}
                            >
                              Decline
                            </Button>
                          </Box>
                        );
                      },
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </Button>
            <RouterLink to="/profile">
              <IconButton
                colorScheme="blue"
                aria-label="Profile"
                icon={<FontAwesomeIcon icon={faUser} />}
              />
            </RouterLink>
          </HStack>
        </Flex>
      </GridItem>
      <GridItem m="auto">
        <Groups userGroups={userData?.groups} />
        <Flex justifyContent="flex-end">
          <Link to="/group/create-group">
            <GradientButton>New Doggo Group</GradientButton>
          </Link>
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default LoggedIn;
