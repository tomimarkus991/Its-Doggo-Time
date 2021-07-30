import {
  Box,
  Button,
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
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { InviteGroupsType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { InviteCard } from '../Cards';
import { LinkLabel } from '../Links';

interface Props {
  userInvites: InviteGroupsType[] | undefined;
}

const Invites: React.FC<Props> = ({ userInvites }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const declineInvite = async (invite_id: string) => {
    // delete invite with that id
    await supabase.from('invites').delete().eq('id', invite_id);
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

  return (
    <Box>
      <VStack cursor="pointer">
        <FontAwesomeIcon
          id="Invites"
          icon={faEnvelope}
          color="#DDCDBF"
          size="3x"
          onClick={onOpen}
        />
        <LinkLabel htmlFor="Invites" label="Invites" />
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invites</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="lg">
            <VStack>
              {userInvites?.map(
                (invite: InviteGroupsType, index: number) => {
                  return (
                    <Box w="full" key={index}>
                      <InviteCard
                        invite={invite}
                        declineInvite={async invite_id =>
                          declineInvite(invite_id)
                        }
                        acceptInvite={async (group_id, invite_id) =>
                          acceptInvite(group_id, invite_id)
                        }
                      />
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
  );
};
export default Invites;
