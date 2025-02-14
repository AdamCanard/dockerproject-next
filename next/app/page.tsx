"use client";
import { useContext } from "react";
import UserContextProvider, { UserContext } from "./context/usercontext";

export default function Home() {
  return (
    <>
      <UserContextProvider>
        <UserFile />
      </UserContextProvider>
    </>
  );
}

function UserFile() {
  const { userId } = useContext(UserContext);
  return <div>{userId}</div>;
}
