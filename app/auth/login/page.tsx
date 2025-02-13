"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getUsers = async (formData: FormData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });
      await response.json();
      if (response.status === 200) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUsername("");
    setPassword("");
    await getUsers(formData);
  };

  return (
    <div
      className={
        "flex flex-col gap-2 justify-center items-center w-full h-full "
      }
    >
      <h1>Login</h1>
      <form
        className={"w-72 flex flex-col gap-2"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={"w-full flex justify-between"}>
          <label>Username:</label>
          <input
            name="username"
            value={username}
            onChange={(e) => {
              handleUsername(e);
            }}
          />
        </div>

        <div className={"w-full flex justify-between"}>
          <label>Password:</label>
          <input
            name="password"
            value={password}
            onChange={(e) => {
              handlePassword(e);
            }}
          />
        </div>
        <div className={"w-full flex flex-row justify-between"}>
          <button onClick={() => router.push("/auth/signup")} type="button">
            {" "}
            Sign Up
          </button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
