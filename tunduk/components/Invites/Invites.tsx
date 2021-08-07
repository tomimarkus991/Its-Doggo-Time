import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { GradientButton } from '../Buttons';
import { InviteCard } from '../Cards';
import { InvitesIcon } from '../Icons/Navbar';
import { GradientButtonText, LinkLabel } from '../Text';

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

  const InvitesModalBG = useColorModeValue('#ffffff', 'gray.800');

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
      const _invitesdata = invitesdata as InviteDataType[];
      setUserInvites(_invitesdata);
      // _invitesdata.forEach(invite => {
      // listenForInviteDeletes(invite);
      // });
      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    }
  };

  const listenForInviteInserts = (username: StringOrUndefined) => {
    supabase
      // only listen to updates that have your username in it
      .from(`invites:receiver=eq.${username}`)
      // when someone invites you to group
      .on('INSERT', async payload => {
        // take the newly inserted data
        const { sender, receiver, id, group_id } = payload.new;
        let { data: groups } = await supabase
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
          groups,
        };
        setUserInvites((oldData: any) => [...oldData, newInvite]);
      })
      .subscribe();
  };

  const declineInvite = async (invite_id: string) => {
    // delete invite with that id
    await supabase.from('invites').delete().eq('id', invite_id);
    setUserInvites(oldData =>
      oldData?.filter(data => data.id !== invite_id),
    );
  };
  const acceptInvite = async (group_id: string, invite_id: string) => {
    const memberUpdates = {
      profile_id: user?.id,
      group_id,
    };
    await supabase.from('members').insert(memberUpdates, {
      returning: 'minimal',
    });

    // delete invite with that id
    await supabase.from('invites').delete().eq('id', invite_id);
    setUserInvites(oldData =>
      oldData?.filter(data => data.id !== invite_id),
    );
  };

  useEffect(() => {
    listenForInviteInserts(currentUsername);
    fetchInvites(currentUsername);
  }, [currentUsername]);

  useEffect(() => {
    if (userInvites?.length === 0) {
      onClose();
    }
  }, [userInvites]);

  return (
    <>
      <VStack cursor="pointer" onClick={onOpen}>
        <InvitesIcon id="Invites" fontSize="4rem" />
        <LinkLabel htmlFor="Invites" label="Invites" />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg={InvitesModalBG}>
          <ModalHeader fontSize="3xl">Invites</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="lg">
            <VStack my="8" spacing="16">
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

          <ModalFooter py={2}>
            <GradientButton onClick={onClose}>
              <GradientButtonText fontSize={20}>Close</GradientButtonText>
            </GradientButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Invites;
