import React, { createContext, useState} from "react";
import type { Message } from "../services/Request";




interface ChatContextType {
  MessageApi: Message[];
  setMessageApi: React.Dispatch<React.SetStateAction<Message[]>>;
}


export const chatContext = createContext<ChatContextType>({
  MessageApi: [],
  setMessageApi: () => {},
});

interface ChatProviderProps {
  children: React.ReactNode;
}

// 👇 Provider component
export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [MessageApi, setMessageApi] = useState<Message[]>([]);

  return (
    <chatContext.Provider value={{ MessageApi, setMessageApi }}>
      {children}
    </chatContext.Provider>
  );
};

export default ChatProvider;
