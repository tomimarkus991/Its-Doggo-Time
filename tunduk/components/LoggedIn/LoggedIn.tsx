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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InviteGroupsType, ProfileType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { Name } from '../Account';
import { AvatarInvite, AvatarProfile } from '../Avatar';
import { GradientButton } from '../Buttons';
import { GroupsContainer } from '../Containers';
import { EnvelopeIcon } from '../Icons/LightMode/EnvelopeIcon';
import { ProfileLink } from '../Links';

const LoggedIn: React.FC = () => {
  const [userInvites, setUserInvites] = useState<InviteGroupsType[]>();
  const [userData, setUserData] = useState<ProfileType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const borderColor = useColorModeValue('gray.800', 'white');
  const [user] = useState<User | null>(supabase.auth.user());

  const fetchUserGroups = async () => {
    try {
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
  }, []);
  useEffect(() => {
    fetchInvites();
  }, [userData]);

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
            <AvatarProfile src={userData?.avatar_url as string} />
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
              <IconButton
                aria-label="Invites"
                onClick={onOpen}
                icon={<EnvelopeIcon width="12" height="12" />}
              >
                Invites
              </IconButton>

              <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="inside"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Invites</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody maxH="lg">
                    {/* @todo make modal body scroll max 2 invites on screen
                    rest is scrolling */}
                    <VStack>
                      {userInvites?.map(
                        (invite: InviteGroupsType, index) => {
                          return (
                            <Box
                              key={index}
                              boxSizing="border-box"
                              border="1px"
                              borderColor="gray.300"
                              borderRadius={20}
                              py="4"
                              w="full"
                            >
                              <Flex
                                flexDirection="column"
                                alignItems="center"
                              >
                                <AvatarInvite
                                  src={invite.groups.avatar_url}
                                />
                                <Text
                                  maxW="10.5rem"
                                  textAlign="center"
                                  mb={3}
                                >
                                  <strong>{invite.sender}</strong> invites
                                  you to <br /> join group called <br />
                                  <strong>
                                    {' '}
                                    "{invite.groups.group_name}"
                                  </strong>
                                </Text>
                                <HStack spacing="7">
                                  <IconButton
                                    aria-label="decline"
                                    bgColor="red.500"
                                    icon={
                                      <FontAwesomeIcon icon={faTimes} />
                                    }
                                    onClick={() =>
                                      declineInvite(invite.id)
                                    }
                                  />
                                  <IconButton
                                    aria-label="accept"
                                    bgColor="green.400"
                                    icon={
                                      <FontAwesomeIcon icon={faCheck} />
                                    }
                                    onClick={() =>
                                      acceptInvite(
                                        invite.groups.id,
                                        invite.id,
                                      )
                                    }
                                  />
                                </HStack>
                              </Flex>
                            </Box>
                          );
                        },
                      )}
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            {/* <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </Button> */}
            <ProfileLink />
          </HStack>
        </Flex>
      </GridItem>
      <GridItem m="auto">
        <GroupsContainer userGroups={userData?.groups} />
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
