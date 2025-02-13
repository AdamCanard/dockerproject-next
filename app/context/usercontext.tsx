"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext({} as IUserContext);

export default function UserContextProvider(props: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const getUserId = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId + "");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return new Response(JSON.stringify({}));
      }
    }
  }, []);

  useEffect(() => {
    if (userId === "") {
      getUserId();
    }
  }, [getUserId, userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
}
