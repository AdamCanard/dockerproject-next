"use client";
import { useContext } from "react";
import { UserContext } from "./context/usercontext";

export default function Home() {
  const { userId } = useContext(UserContext);
  return <UserFile userId={userId} />;
}

function UserFile(props: { userId: string }) {
  return <>{props.userId}</>;
}
