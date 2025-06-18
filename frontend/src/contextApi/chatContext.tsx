import React, { createContext, useState } from "react";
import type { Message } from "../services/Request";

interface UserState {
  isLoggedIn: boolean;
  username: string;
  email: string;
}

interface ChatContextType {
  MessageApi: Message[];
  setMessageApi: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isOpenLogin: boolean;
  onCloseLogin: () => void;
  onOpenLogin: () => void;
  userstate: {
  isLoggedIn: boolean;
  username: string;
  email: string;
}
  setUserstate: React.Dispatch<React.SetStateAction<UserState>>;
}

export const chatContext = createContext<ChatContextType>({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  isOpenLogin: false,
  onCloseLogin: () => {},
  onOpenLogin: () => {},
  MessageApi: [],
  setMessageApi: () => {},
  userstate: {
    isLoggedIn: false,
    username: "",
    email: ""
  },
  setUserstate: () => {}
});

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [MessageApi, setMessageApi] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [userstate, setUserstate] = useState<UserState>({
    isLoggedIn: false,
    username: "",
    email: ""
  });

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onOpenLogin = () => setIsOpenLogin(true);
  const onCloseLogin = () => setIsOpenLogin(false);

  return (
    <chatContext.Provider
      value={{
        MessageApi,
        setMessageApi,
        isOpen,
        onClose,
        onOpen,
        isOpenLogin,
        onCloseLogin,
        onOpenLogin,
        userstate,
        setUserstate
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatProvider;
