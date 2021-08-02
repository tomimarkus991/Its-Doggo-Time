import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarGroup, AvatarUpload } from '../../components/Avatar';
import { LogsContainer } from '../../components/Containers';
import { Heading, Name } from '../../components/Headers';
import MainLayout from '../../components/Layouts/MainLayout';
import {
  MembersLink,
  MyGroupsLink,
  ProfileLink,
} from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import { GroupPageDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  id: string;
}

const Group: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [old_group_name, setOldGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();
  const { user } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  // const [groupMembers, setGroupMembers] = useState<any>([]);
  const toast = useToast();
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);

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
      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    } finally {
      toast({
        title: 'Group Updated',
        description: 'Your Group has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
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
          .eq('id', id)
          .single();

        let _groupData: GroupPageDataType = data;
        const { avatar_url, group_name, creator_id } = _groupData;

        setCreatorId(creator_id);
        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
        setOldGroupname(group_name);

        if (error) throw error.message;
      } catch (error) {
        alert(error.message);
      } finally {
        setIsGroupdataLoading(false);
      }
    };

    fetchGroupData();
  }, []);

  const EditableControls = () => {
    return isEditable ? (
      <ButtonGroup alignItems="center" size="sm">
        <IconButton
          borderRadius="20"
          onClick={() => cancelSave()}
          aria-label="Cancel"
          colorScheme="red"
          icon={<CloseIcon />}
        />
        <IconButton
          borderRadius="20"
          onClick={() => submitSave()}
          aria-label="Save"
          colorScheme="green"
          icon={<CheckIcon />}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          onClick={() => setIsEditable(true)}
          aria-label="Edit"
          size="sm"
          w="100%"
          h="100%"
          p={2}
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          icon={
            <FontAwesomeIcon icon={faPen} size={'2x'} color="#2A2828" />
          }
        />
      </Flex>
    );
  };
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
    } finally {
      toast({
        title: 'Group Picture Updated',
        description: 'Your Group Picture has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{ borderRadius: 100 }}
        >
          <VStack>
            <AvatarGroup src={group_avatar_url as string} />
            {isEditable ? (
              <AvatarUpload
                onUpload={(url: string) => {
                  setGroupAvatarUrl(url);
                  updateGroupPicture(url);
                }}
                title={'Update Photo'}
              />
            ) : null}

            {isEditable ? (
              <Input
                onChange={e => setGroupname(e.target.value)}
                value={group_name as string}
                isDisabled={!isEditable}
                fontSize="3xl"
                size="lg"
                width="2xs"
              />
            ) : (
              <Name title={group_name} />
            )}
            {user?.id === creator_id ? <EditableControls /> : null}
          </VStack>
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="Overview" />
          </Box>
          <LogsContainer />
        </Box>
      }
      rightSide={
        <>
          <MembersLink group_id={id} />
          <MyGroupsLink />
          <ProfileLink />
        </>
      }
    />
  );
};
export default Group;
