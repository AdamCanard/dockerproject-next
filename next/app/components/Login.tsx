"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserContext } from "../context/usercontext";

export default function Login() {
  const { setUserId } = useContext(UserContext);
  const [loginUserId, setLoginUserId] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const addUserId = (increase: number) => {
    const newUserId = loginUserId + increase;
    setLoginUserId(newUserId);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getUsers = async () => {
    const body = { userId: loginUserId, password: password };
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data: { userId: number } = await response.json();
      setLoginUserId(0);
      setPassword("");
      setUserId(data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getUsers();
  };

  return (
    <div className={"Box flex flex-col w-80 justify-center items-center "}>
      {" "}
      <h1>Login</h1>
      <form
        className={"w-72 flex flex-col gap-2"}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={"w-full flex justify-between flex-col"}>
          <label>UserId:</label>
          <div className={"flex flex-row justify-around w-full"}>
            <input
              disabled
              className={"w-full text-center"}
              name="userId"
              value={loginUserId}
            />
            <div className={"flex w-full justify-around"}>
              <button
                type="button"
                onClick={() => addUserId(1)}
                className={"w-10"}
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => addUserId(5)}
                className={"w-10"}
              >
                +5
              </button>
              <button
                type="button"
                onClick={() => addUserId(10)}
                className={"w-10"}
              >
                +10
              </button>
            </div>
          </div>
        </div>

        <div className={"w-full flex justify-between flex-col"}>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              handlePassword(e);
            }}
          />
        </div>
        <div className={"w-full flex flex-row justify-between"}>
          <button onClick={() => router.push("/auth/signup")} type="button">
            {" "}
            Signup
          </button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
