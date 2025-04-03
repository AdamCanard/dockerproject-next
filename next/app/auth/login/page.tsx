"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState<number>(0);
  const [deleteUserId, setDeleteUserId] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const addUserId = (increase: number) => {
    const newUserId = userId + increase;
    setUserId(newUserId);
  };
  const addDeleteUserId = (increase: number) => {
    const newUserId = deleteUserId + increase;
    setDeleteUserId(newUserId);
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
  const deleteUser = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        body: JSON.stringify({ userId: deleteUserId }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.message);
        console.log(response);
      } else {
        const data = await response.json();
        setMessage(data.message);
        console.log(response);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setMessage(e.message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getUsers();
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await deleteUser();
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

      <div className={"Box"}>
        {message !== "" ? (
          <div className={"select-none"} onClick={() => setMessage("")}>
            {message}
          </div>
        ) : (
          <>
            <h1>Delete an account</h1>
            <form
              className={"w-72 flex flex-col gap-2"}
              onSubmit={(e) => handleDelete(e)}
            >
              <div className={"w-full flex justify-between flex-col"}>
                <label>UserId:</label>
                <div className={"flex flex-row justify-around w-full"}>
                  <input
                    disabled
                    className={"w-full text-center"}
                    name="userId"
                    value={deleteUserId}
                  />
                  <div className={"flex w-full justify-around"}>
                    <button
                      type="button"
                      onClick={() => addDeleteUserId(1)}
                      className={"w-10"}
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => addDeleteUserId(5)}
                      className={"w-10"}
                    >
                      +5
                    </button>
                    <button
                      type="button"
                      onClick={() => addDeleteUserId(10)}
                      className={"w-10"}
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
              <button>Delete</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
