"use client";

import { useEffect, useState } from "react";
import User from "./User";
import { IUser } from "../types";

export default function UserList() {
  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserList(data);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    if (userList.length === 0) {
      getUserList();
    }
  }, [userList]);
  return (
    <div className={"Box w-80 "}>
      {userList.map((user: IUser, index: number) => {
        return <User user={user} key={index} />;
      })}
      <button onClick={() => getUserList()}>Refresh</button>
    </div>
  );
}
