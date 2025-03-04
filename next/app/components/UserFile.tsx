"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/usercontext";
import { useRouter } from "next/navigation";

export default function UserFile() {
  const { userData, updateData } = useContext(UserContext);
  const [currentUserData, setCurrentUserData] = useState<string>("");

  const router = useRouter();
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
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);
  return (
    <div className={" flex-col w-96 h-64 Box "}>
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
    </div>
  );
}
