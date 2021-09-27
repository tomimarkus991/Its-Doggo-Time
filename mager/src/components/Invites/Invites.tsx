import {
  Box,
  Icon,
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
import React, { useEffect } from 'react';
import { useAuth } from '../../context';
import { useUser } from '../../context/UserContext';
import { useFetchInvites } from '../../hooks/api';
import { useSubscribeToInviteInserts } from '../../hooks/subcribe';
import useColors from '../../hooks/useColors';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import GradientButton from '../Buttons/GradientButton';
import { InviteCard } from '../Cards';
import { InvitesIcon } from '../Icons';
import { GradientButtonText, LinkLabel } from '../Text';

interface Props {}

const Invites: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userInvites, setUserInvites } = useUser();

  const { defaultColor } = useColors();

  useSubscribeToInviteInserts();
  useFetchInvites();

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
    if (userInvites?.length === 0) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInvites]);

  return (
    <>
      <VStack cursor="pointer" onClick={onOpen}>
        <Box position="relative">
          <InvitesIcon id="Invites" fontSize="4rem" />
          {userInvites.length >= 1 && (
            <Icon
              position="absolute"
              bottom={-2}
              right={-2}
              viewBox="0 0 200 200"
              fontSize="1.5rem"
              color="green.500"
            >
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          )}
        </Box>
        <LinkLabel htmlFor="Invites" label="Invites" />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg={defaultColor}>
          <ModalHeader fontSize="3xl">Invites</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="lg">
            <VStack my="8" spacing="16">
              {userInvites?.map(
                (invite: InviteDataType, index: number) => {
                  return (
                    <InviteCard
                      key={index}
                      invite={invite}
                      declineInvite={async invite_id =>
                        declineInvite(invite_id)
                      }
                      acceptInvite={async (group_id, invite_id) =>
                        acceptInvite(group_id, invite_id)
                      }
                    />
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
