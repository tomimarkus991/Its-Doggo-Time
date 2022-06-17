import {
  Box,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { useColors } from "hooks";

import { useInviteUser } from "hooks/mutations";
import { useFetchGroupData } from "hooks/queries";

import { GradientButton } from "../Buttons";
import { AddMemberIcon } from "../Icons";
import { GradientButtonText } from "../Text";

interface Props {
  group_id: string;
}

export const AddNewMemberModal = ({ group_id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAddMemberDisabled, setIsAddMemberDisabled] = useState(false);
  const [inviteReceiver, setInviteReceiver] = useState("");

  const { defaultColor } = useColors();

  const { mutate } = useInviteUser();
  const { data: group } = useFetchGroupData(group_id);

  useEffect(() => {
    const howManyMembersGroupHas = () => {
      if (group?.profiles && group.profiles.length >= 6) {
        setIsAddMemberDisabled(true);
      }
    };
    howManyMembersGroupHas();
  }, [group?.profiles]);

  return (
    <>
      <Box
        as={IconButton}
        onClick={onOpen}
        aria-label="Add new member"
        h="100%"
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        isDisabled={isAddMemberDisabled}
        icon={
          <AddMemberIcon
            fontSize={{
              base: "5rem",
              md: "6rem",
              lg: "7rem",
            }}
          />
        }
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent bg={defaultColor} borderRadius={20}>
          <ModalHeader textTransform="uppercase" textAlign="center">
            Add a member
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant={"removeDefault"}
              autoCapitalize="off"
              errorBorderColor="crimson"
              placeholder="Nickname"
              borderRadius={20}
              size="lg"
              fontSize="2xl"
              onChange={e => setInviteReceiver(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <GradientButton
              onClick={() => {
                mutate({ inviteReceiver, group_id });
                onClose();
              }}
            >
              <GradientButtonText fontSize={25}>Invite</GradientButtonText>
            </GradientButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
