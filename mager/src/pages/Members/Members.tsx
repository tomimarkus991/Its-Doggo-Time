import {
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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MembersAlert from '../../components/Alerts/MembersAlert';
import { GradientButton } from '../../components/Buttons';
import LeaveGroupButton from '../../components/Buttons/LeaveGroupButton';
import { MembersContainer } from '../../components/Containers';
import { AddMemberIcon } from '../../components/Icons/Doggo';
import MainLayout from '../../components/Layouts/MainLayout';
import PageHeaderBack from '../../components/Layouts/Pages/PageHeaderBack';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import ProfileAndMyGroups from '../../components/Links/Layout/ProfileAndMyGroups';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import {
  useSubscribeToMemberDeletes,
  useSubscribeToMemberInserts,
} from '../../hooks/subcribe';
import useColors from '../../hooks/useColors';
import {
  GroupPageDataType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { getCurrentUser } from '../../utils/getCurrentUser';
import { supabase } from '../../utils/supabaseClient';
interface RouteParams {
  group_id: string;
}
const Members: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [inviteReceiver, setInviteReceiver] = useState<string | null>();
  const [creator_id, setCreatorId] = useState<StringOrUndefined>();

  const [isInvalid, setIsInvalid] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);
  const [isAddMemberDisabled, setIsAddMemberDisabled] =
    useState<boolean>(false);

  const { defaultColor } = useColors();

  const { subscribetoMemberInserts } = useSubscribeToMemberInserts({
    group_id,
    setProfiles,
  });

  const fetchUpdatedMembers = async () => {
    try {
      setIsGroupdataLoading(true);
      let { data, error } = await supabase
        .from('groups')
        .select(
          `
          id,
          profiles (id, username, avatar_url)
        `,
        )
        .eq('id', group_id)
        .single();
      let _groupData: GroupPageDataType = data;
      const { profiles } = _groupData;

      setProfiles(profiles);

      if (error) throw error.message;
    } catch (error) {
      throw error;
    } finally {
      setIsGroupdataLoading(false);
    }
  };
  const { subscribeToMemberDeletes } = useSubscribeToMemberDeletes({
    group_id,
    fetchUpdatedMembers,
  });

  const sendInvite = async () => {
    try {
      const { username } = await getCurrentUser();

      // finds if there are any members with {inviteReceiver} username
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', inviteReceiver);
      if (data?.length === 0) {
        setIsInvalid(true);
      } else {
        const values = {
          receiver: inviteReceiver,
          sender: username,
          group_id,
        };

        const { error } = await supabase
          .from('invites')
          .insert(values, { returning: 'minimal' });

        if (error) throw error.message;
        setInviteReceiver(null);
        onClose();
      }

      if (error) throw error.message;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
        let { data } = await supabase
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
          .eq('id', group_id)
          .single();
        let _groupData: GroupPageDataType = data;
        const { avatar_url, group_name, creator_id, profiles } =
          _groupData;

        setCreatorId(creator_id);
        setGroupname(group_name);
        setGroupAvatarUrl(avatar_url);
        setProfiles(profiles);
      } catch (error) {
        throw error;
      } finally {
        setIsGroupdataLoading(false);
      }
    };
    subscribetoMemberInserts();
    subscribeToMemberDeletes();
    fetchGroupData();
    return () => {
      supabase.removeSubscription(subscribetoMemberInserts());
      supabase.removeSubscription(subscribeToMemberDeletes());
    };
  }, []);

  useEffect(() => {
    const howManyMembersGroupHas = () => {
      if (profiles?.length >= 6) {
        setIsAddMemberDisabled(true);
      }
    };
    howManyMembersGroupHas();
  }, [profiles]);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
            h: '80%',
          }}
        >
          <HeaderAvatar>
            <NameAndAvatar
              title={group_name}
              avatar_url={group_avatar_url}
              avatar="Group"
            />
          </HeaderAvatar>
          <LeaveGroupButton
            user_id={user?.id}
            group_id={group_id}
            creator_id={creator_id}
          />
        </Skeleton>
      }
      middle={
        <>
          <NameAndAvatarMiddle
            name={group_name}
            avatar_url={group_avatar_url}
            avatar="Group"
          />

          <PageHeaderBack>Members</PageHeaderBack>

          <MembersContainer
            members={profiles}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            group_id={group_id}
            creator_id={creator_id}
            isLoading={isGroupdataLoading}
            AddNewMember={
              <>
                <IconButton
                  onClick={onOpen}
                  aria-label="Add new member"
                  w="100%"
                  h="100%"
                  borderRadius="100"
                  isDisabled={isAddMemberDisabled}
                  bgColor="transparent"
                  _hover={{ bgColor: 'transparent' }}
                  icon={
                    <AddMemberIcon
                      fontSize={{
                        base: '5rem',
                        md: '7rem',
                      }}
                    />
                  }
                />
                <Modal
                  isOpen={isOpen}
                  onClose={() => {
                    onClose();
                    setIsInvalid(false);
                  }}
                  size="sm"
                >
                  <ModalOverlay />
                  <ModalContent bg={defaultColor} borderRadius={20}>
                    <ModalHeader
                      textTransform="uppercase"
                      textAlign="center"
                    >
                      Add a member
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {isInvalid ? <MembersAlert /> : null}

                      <Input
                        variant={'removeDefault'}
                        autoCapitalize="off"
                        isInvalid={isInvalid}
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
                        <GradientButtonText fontSize={25}>
                          Invite
                        </GradientButtonText>
                      </GradientButton>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            }
          />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default Members;
