import {
  useDisclosure,
  IconButton,
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useGroup, useInvite } from '../../context';
import { useColors } from '../../hooks';
import { useUser } from '../../hooks/queries';
import { supabase } from '../../utils/supabaseClient';
import { MembersAlert } from '../Alerts';
import { GradientButton } from '../Buttons';
import { AddMemberIcon } from '../Icons';
import { GradientButtonText } from '../Text';

interface Props {
  group_id: string;
}

const AddNewMemberModal: React.FC<Props> = ({ group_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { members } = useGroup();

  const {
    isInviteInvalid,
    setIsInviteInvalid,
    inviteReceiver,
    setInviteReceiver,
  } = useInvite();
  const [isAddMemberDisabled, setIsAddMemberDisabled] =
    useState<boolean>(false);

  const { defaultColor } = useColors();
  const { data: userData } = useUser();

  useEffect(() => {
    const howManyMembersGroupHas = () => {
      if (members?.length >= 6) {
        setIsAddMemberDisabled(true);
      }
    };
    howManyMembersGroupHas();
  }, [members]);
  const sendInvite = async () => {
    try {
      // finds if there are any members with {inviteReceiver} username
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', inviteReceiver);
      if (data?.length === 0) {
        setIsInviteInvalid(true);
      } else {
        const values = {
          receiver: inviteReceiver,
          sender: userData?.username,
          group_id,
        };

        const { error } = await supabase
          .from('invites')
          .insert(values, { returning: 'minimal' });

        if (error) throw error.message;
        setInviteReceiver('');
        onClose();
      }

      if (error) throw error.message;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Box
        as={IconButton}
        onClick={onOpen}
        aria-label="Add new member"
        h="100%"
        bgColor="transparent"
        _hover={{ bgColor: 'transparent' }}
        isDisabled={isAddMemberDisabled}
        icon={
          <AddMemberIcon
            fontSize={{
              base: '5rem',
              md: '6rem',
              lg: '7rem',
            }}
          />
        }
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsInviteInvalid(false);
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
            {isInviteInvalid && <MembersAlert />}

            <Input
              variant={'removeDefault'}
              autoCapitalize="off"
              isInvalid={isInviteInvalid}
              errorBorderColor="crimson"
              placeholder="Nickname"
              borderRadius={20}
              size="lg"
              fontSize="2xl"
              onChange={e => setInviteReceiver(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <GradientButton onClick={sendInvite}>
              <GradientButtonText fontSize={25}>Invite</GradientButtonText>
            </GradientButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddNewMemberModal;
