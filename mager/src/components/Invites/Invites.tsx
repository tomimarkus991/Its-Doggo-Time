import {
  Box,
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
import { useFetchInvites } from '../../hooks/queries';
import { useSubscribeToInviteInserts } from '../../hooks/subcribe';
import useColors from '../../hooks/useColors';
import { InviteDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import GradientButton from '../Buttons/GradientButton';
import { InviteCard } from '../Cards';
import { InviteNotificationIcon, InvitesIcon } from '../Icons';
import { Skeleton } from '../Skeleton';
import { GradientButtonText, LinkLabel } from '../Text';

interface Props {}

const Invites: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { setUserInvites } = useUser();

  const { defaultColor } = useColors();

  useSubscribeToInviteInserts();
  const { data: userInvites, isLoading } = useFetchInvites();

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
    <Skeleton isLoading={isLoading}>
      <VStack cursor="pointer" onClick={onOpen}>
        <Box position="relative">
          <InvitesIcon id="Invites" fontSize="4rem" />
          {/* if user has invites show green dot */}
          {!!userInvites?.length && <InviteNotificationIcon />}
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
    </Skeleton>
  );
};
export default Invites;
