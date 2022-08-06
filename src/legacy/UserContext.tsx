import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

import { InviteDataType } from "types";

type InitialContextType = {
  username: string;
  old_username: string;
  user_avatar_url: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setOldUsername: Dispatch<SetStateAction<string>>;
  setUserAvatarUrl: Dispatch<SetStateAction<string>>;
  userInvites: InviteDataType[];
  setUserInvites: Dispatch<SetStateAction<InviteDataType[]>>;
  isUserdataLoading: boolean;
  setIsUserdataLoading: Dispatch<SetStateAction<boolean>>;
};

const initUserContext: InitialContextType = {
  username: "",
  old_username: "",
  user_avatar_url: "",
  setUsername: () => {},
  setOldUsername: () => {},
  setUserAvatarUrl: () => {},
  userInvites: [],
  setUserInvites: () => {},
  isUserdataLoading: true,
  setIsUserdataLoading: () => {},
};

const UserContext = createContext(initUserContext);

export const useUser = () => useContext(UserContext);

export const UserDetailsProvider = ({ children }: any) => {
  const [username, setUsername] = useState("");
  const [old_username, setOldUsername] = useState("");
  const [user_avatar_url, setUserAvatarUrl] = useState("");
  const [userInvites, setUserInvites] = useState<InviteDataType[]>([]);
  const [isUserdataLoading, setIsUserdataLoading] = useState<boolean>(true);

  const value = {
    username,
    setUsername,
    user_avatar_url,
    setUserAvatarUrl,
    userInvites,
    setUserInvites,
    isUserdataLoading,
    setIsUserdataLoading,
    old_username,
    setOldUsername,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
