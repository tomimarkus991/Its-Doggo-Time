import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import {
  faMoon,
  faSun,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarUpload, Name } from '../../components/Account';
import { Chats } from '../../components/Containers';
import { GroupProfileIcon } from '../../components/Icons/Profile/GroupProfileIcon';
import { GroupPageDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  id: string;
}
const GroupPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [old_group_name, setOldGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();

  const [isEditable, setIsEditable] = useState(false);
  // const [groupMembers, setGroupMembers] = useState<any>([]);

  const user: User | null = supabase.auth.user();
  const fetchGroupData = async () => {
    try {
      let { data, error } = await supabase
        .from('groups')
        .select(
          `
          id,
          group_name,
          avatar_url,
          creator_id,
          profiles (id, username, avatar_url)
      `,
        )
        .eq('id', id);
      if (!data) throw error;
      let _groupData: GroupPageDataType = data[0];
      const { avatar_url, group_name, creator_id } = _groupData;

      setCreatorId(creator_id);
      setGroupname(group_name);
      setGroupAvatarUrl(avatar_url);
      setOldGroupname(group_name);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelSave = () => {
    setGroupname(old_group_name);
    setIsEditable(false);
  };
  const submitSave = async () => {
    setIsEditable(false);
    const updates = {
      id,
      group_name,
      avatar_url: group_avatar_url,
      updated_at: new Date(),
    };

    try {
      let { error } = await supabase.from('groups').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });
      setOldGroupname(group_name);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  function EditableControls() {
    return isEditable ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          onClick={() => submitSave()}
          aria-label="Save"
          icon={<CheckIcon />}
        />
        <IconButton
          onClick={() => cancelSave()}
          aria-label="Cancel"
          icon={<CloseIcon />}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          onClick={() => setIsEditable(true)}
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
        />
      </Flex>
    );
  }
  const updateGroupPicture = async (avatar_url: StringOrUndefined) => {
    try {
      const updates = {
        id,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('groups').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Center h="100%">
      <Grid
        templateColumns="1fr"
        templateRows="0.2fr 1fr"
        templateAreas='"buttons" "groups"'
        h="100%"
        w="100%"
        maxW="3xl"
      >
        <GridItem gridArea="buttons" py={10}>
          <Flex flexDir="row">
            <HStack>
              <Flex
                flexDirection="column"
                justifyContent="center"
                mr="1em"
              >
                <Avatar
                  icon={<GroupProfileIcon fontSize="8rem" />}
                  src={group_avatar_url}
                  size="2xl"
                />
                {isEditable ? (
                  <AvatarUpload
                    onUpload={(url: string) => {
                      setGroupAvatarUrl(url);
                      updateGroupPicture(url);
                    }}
                  />
                ) : null}
              </Flex>
              {isEditable ? (
                <Input
                  onChange={e => setGroupname(e.target.value)}
                  value={group_name as string}
                  isDisabled={!isEditable}
                  fontSize="4xl"
                  size="lg"
                />
              ) : (
                <Name title={group_name} textProps={{ ml: '10' }} />
              )}
              {user?.id === creator_id ? <EditableControls /> : null}
              <Button>
                <FontAwesomeIcon icon={faUsers} />
              </Button>
            </HStack>
            <Spacer />
            <HStack alignItems="flex-start">
              <>
                <Button onClick={onOpen}>Invites</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Invites</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? (
                  <FontAwesomeIcon icon={faMoon} />
                ) : (
                  <FontAwesomeIcon icon={faSun} />
                )}
              </Button>
              <Link to="/profile">
                <IconButton
                  colorScheme="blue"
                  aria-label="Profile"
                  icon={<FontAwesomeIcon icon={faUser} />}
                />
              </Link>
            </HStack>
          </Flex>
        </GridItem>
        <GridItem gridArea="groups" m="auto">
          <Chats />
        </GridItem>
      </Grid>
    </Center>
  );
};
export default GroupPage;

// @todo - invites. you enter username to whom you want to send the invitation
// @todo - group_id and sender will be automatically assigned