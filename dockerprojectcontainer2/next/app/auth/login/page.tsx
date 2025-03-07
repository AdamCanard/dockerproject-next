"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const addUserId = (increase: number) => {
    console.log(increase);
    const newUserId = userId + increase;
    setUserId(newUserId);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getUsers = async () => {
    const data = { userId: userId, password: password };
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await response.json();
      setUserId(0);
      setPassword("");
      if (response.status === 200) {
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getUsers();
  };

  return (
    <div
      className={
        "flex flex-col gap-2 justify-center items-center w-full h-full "
      }
    >
      <div className={"Box"}>
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
                value={userId}
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
    </div>
  );
}
