"use client";
import { useRouter } from "next/navigation";

export default function UserModal(props: { userId: number }) {
  const router = useRouter();
  return (
    <div className={" w-64 h-48  aboslute Box "}>
      <div> Your userId is {props.userId}</div>
      <div>DON&apos;T FORGET IT</div>
      <button onClick={() => router.push("/auth/login")}>Login</button>
    </div>
  );
}
