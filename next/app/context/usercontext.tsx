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
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
}

export const UserContext = createContext({} as IUserContext);

export default function UserContextProvider(props: { children: ReactNode }) {
  const [userId, setUserId] = useState(0);
  const getUserId = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log(data.userId.value);
        setUserId(data.userId.value);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return new Response(JSON.stringify({}));
      }
    }
  }, []);

  useEffect(() => {
    if (userId === 0) {
      getUserId();
    }
  }, [getUserId, userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
}
