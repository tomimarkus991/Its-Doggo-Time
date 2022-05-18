import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

import { GroupType, MemberType } from "../types";

type InitialContextType = {
  groupname: string;
  old_groupname: string;
  group_avatar_url: string;
  setGroupname: Dispatch<SetStateAction<string>>;
  setOldGroupname: Dispatch<SetStateAction<string>>;
  setGroupAvatarUrl: Dispatch<SetStateAction<string>>;
  groups: GroupType[];
  setGroups: Dispatch<SetStateAction<GroupType[]>>;
  creator_id: string;
  setCreatorId: Dispatch<SetStateAction<string>>;
  members: MemberType[];
  setMembers: Dispatch<SetStateAction<MemberType[]>>;
  // isLoading:boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const initialContext: InitialContextType = {
  groupname: "",
  old_groupname: "",
  group_avatar_url: "",
  setGroupname: () => {},
  setOldGroupname: () => {},
  setGroupAvatarUrl: () => {},
  groups: [],
  setGroups: () => {},
  creator_id: "",
  setCreatorId: () => {},
  members: [],
  setMembers: () => {},
  // isLoading: true,
  // setIsLoading: () => {},
};

const GroupContext = createContext(initialContext);

export const useGroup = () => useContext(GroupContext);

const GroupDetailsProvider = ({ children }: any) => {
  const [groupname, setGroupname] = useState("");
  const [old_groupname, setOldGroupname] = useState("");
  const [group_avatar_url, setGroupAvatarUrl] = useState("");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [creator_id, setCreatorId] = useState("");
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
    old_groupname,
    setOldGroupname,
  };

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export default GroupDetailsProvider;
