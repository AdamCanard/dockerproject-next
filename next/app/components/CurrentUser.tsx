"use client";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";

export default function CurrentUser() {
  const { userId } = useContext(UserContext);
  return (
    <div className={" w-80 h-12 Box "}>
      <div> Your current userId is {userId}</div>
    </div>
  );
}
