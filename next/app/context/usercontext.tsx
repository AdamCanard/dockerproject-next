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
  userData: string;
  updateData: (arg0: string) => void;
}

export const UserContext = createContext({} as IUserContext);

export default function UserContextProvider(props: { children: ReactNode }) {
  const [userId, setUserId] = useState(-1);
  const [userData, setUserData] = useState("");

  const getUserId = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId.value);
        setUserData(data.userData);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return new Response(JSON.stringify({ e }));
      }
    }
  }, []);

  const updateData = async (newUserData: string) => {
    try {
      const response = await fetch("/api/userData/", {
        method: "PUT",
        body: JSON.stringify({ userData: newUserData }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(response);
        setUserData(data.userData);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return new Response(JSON.stringify({ e }));
      }
    }
  };

  useEffect(() => {
    if (userId === 0) {
      getUserId();
    }
  }, [getUserId, userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, userData, updateData }}>
      {props.children}
    </UserContext.Provider>
  );
}
