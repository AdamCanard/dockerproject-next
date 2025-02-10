"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface IUserContext {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext({} as IUserContext);

export default function UserContextProvider(props: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
}
