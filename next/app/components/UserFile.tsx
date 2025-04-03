"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/usercontext";

export default function UserFile() {
  const { userData, updateData, userId, setUserId } = useContext(UserContext);
  const [currentUserData, setCurrentUserData] = useState<string>("");

  const handleSave = () => {
    updateData(currentUserData);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });
      await response.json();
      if (response.status === 200) {
        setUserId(-1);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);

  return (
    <div className={"flex flex-col justify-center items-center w-80 h-64 Box "}>
      {userId === -1 || userId === undefined ? (
        <>Please log in to access file</>
      ) : (
        <>
          <textarea
            autoFocus
            className={"w-full h-full resize-none"}
            value={currentUserData}
            onChange={(e) => setCurrentUserData(e.target.value)}
          />
          <div className={"flex flex-row justify-between w-full"}>
            {" "}
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}
