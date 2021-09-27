import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { GroupType, MemberType } from '../types';

type InitialContextType = {
  groupname: string;
  group_avatar_url: string;
  setGroupname: Dispatch<SetStateAction<string>>;
  setGroupAvatarUrl: Dispatch<SetStateAction<string>>;
  groups: GroupType[];
  setGroups: Dispatch<SetStateAction<GroupType[]>>;
  creator_id: string;
  setCreatorId: Dispatch<SetStateAction<string>>;
  members: MemberType[];
  setMembers: Dispatch<SetStateAction<MemberType[]>>;
};

const initialContext: InitialContextType = {
  groupname: '',
  group_avatar_url: '',
  setGroupname: () => {},
  setGroupAvatarUrl: () => {},
  groups: [],
  setGroups: () => {},
  creator_id: '',
  setCreatorId: () => {},
  members: [],
  setMembers: () => {},
};

const GroupContext = createContext(initialContext);

export const useGroup = () => useContext(GroupContext);

const GroupDetailsProvider = ({ children }: any) => {
  const [groupname, setGroupname] = useState('');
  const [group_avatar_url, setGroupAvatarUrl] = useState('');
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [creator_id, setCreatorId] = useState('');
  const [members, setMembers] = useState<MemberType[]>([]);

  const value = {
    groupname,
    group_avatar_url,
    setGroupname,
    setGroupAvatarUrl,
    groups,
    setGroups,
    creator_id,
    setCreatorId,
    members,
    setMembers,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export default GroupDetailsProvider;
