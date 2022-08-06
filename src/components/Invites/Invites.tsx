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
} from "@chakra-ui/react";

import { useEffect } from "react";

import { useColors, useAcceptInvite, useDeclineInvite, useFetchInvites } from "hooks";

import {
  InviteCard,
  InviteNotificationIcon,
  InvitesIcon,
  GradientButtonText,
  LinkLabel,
  GradientButton,
} from "components";

import { useSubscribeToInviteInserts } from "hooks/subcribe";
import { InviteDataType } from "types";

import { Skeleton } from "../Skeleton";

export const Invites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { defaultColor } = useColors();

  useSubscribeToInviteInserts();
  const { data: userInvites, isLoading } = useFetchInvites();
  const { mutate: declineInvite } = useDeclineInvite();
  const { mutate: acceptInvite } = useAcceptInvite();

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
              {userInvites?.map((invite: InviteDataType, index: number) => {
                return (
                  <InviteCard
                    key={index}
                    invite={invite}
                    declineInvite={async invite_id => declineInvite({ invite_id })}
                    acceptInvite={async (group_id, invite_id) =>
                      acceptInvite({ group_id, invite_id })
                    }
                  />
                );
              })}
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
