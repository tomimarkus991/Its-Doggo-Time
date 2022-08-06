import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

type InitialContextType = {
  isInviteInvalid: boolean;
  setIsInviteInvalid: Dispatch<SetStateAction<boolean>>;
  inviteReceiver: string;
  setInviteReceiver: Dispatch<SetStateAction<string>>;
};

const initialContext: InitialContextType = {
  isInviteInvalid: false,
  setIsInviteInvalid: () => {},
  inviteReceiver: "",
  setInviteReceiver: () => {},
};

const InviteContext = createContext(initialContext);

export const useInvite = () => useContext(InviteContext);

export const InviteDetailsProvider = ({ children }: any) => {
  const [isInviteInvalid, setIsInviteInvalid] = useState(false);
  const [inviteReceiver, setInviteReceiver] = useState("");

  const value = {
    isInviteInvalid,
    setIsInviteInvalid,
    inviteReceiver,
    setInviteReceiver,
  };

  return <InviteContext.Provider value={value}>{children}</InviteContext.Provider>;
};
