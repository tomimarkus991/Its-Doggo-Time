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
import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { InviteCard } from '../Cards';
import { LinkLabel } from '../Links';

interface Props {
  userInvites: InviteDataType[] | undefined;
  setUserInvites: React.Dispatch<
    React.SetStateAction<InviteDataType[] | undefined>
  >;
  currentUsername: StringOrUndefined;
}

const Invites: React.FC<Props> = ({
  userInvites,
  setUserInvites,
  currentUsername,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const fetchInvites = async (_username: StringOrUndefined) => {
    try {
      const { data: invitesdata, error } = await supabase
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
        .eq('receiver', _username);

      setUserInvites(invitesdata as InviteDataType[]);

      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    }
  };

  const listenForInserts = (username: StringOrUndefined) => {
    supabase
      .from(`invites:receiver=eq.${username}`)
      .on('INSERT', async payload => {
        const { sender, receiver, id, group_id } = payload.new;
        let { data: group } = await supabase
          .from('groups')
          .select(
            `
            id,
            group_name,
            avatar_url
        `,
          )
          .eq('id', group_id)
          .single();

        const newInvite: InviteDataType = {
          id,
          group_id,
          sender,
          receiver,
          group,
        };
        setUserInvites((oldData: any) => [...oldData, newInvite]);
      })
      .subscribe();
  };
  const listenForDeletes = () => {
    supabase
      .from(`invites`)
      .on('DELETE', payload => {
        console.log('payload', payload);

        setUserInvites(oldData =>
          oldData?.filter(data => data.id !== payload.old.id),
        );
      })
      .subscribe();
  };

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

  useEffect(() => {
    listenForDeletes();
  }, []);

  useEffect(() => {
    listenForInserts(currentUsername);
    fetchInvites(currentUsername);
  }, [currentUsername]);

  return (
    <Box>
      <VStack cursor="pointer" onClick={onOpen}>
        <FontAwesomeIcon
          id="Invites"
          icon={faEnvelope}
          color="#DDCDBF"
          size="3x"
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
                (invite: InviteDataType, index: number) => {
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
