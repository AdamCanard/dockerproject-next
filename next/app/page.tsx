"use client";
import { useContext, useEffect, useState } from "react";
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
  const { userData, updateData } = useContext(UserContext);
  const [currentUserData, setCurrentUserData] = useState<string>("");

  const handleClick = () => {
    updateData(currentUserData);
  };
  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);
  return (
    <div className={"flex flex-col w-full h-full justify-center items-center"}>
      <textarea
        value={currentUserData}
        onChange={(e) => setCurrentUserData(e.target.value)}
      />
      <button onClick={handleClick}>Save</button>
    </div>
  );
}
