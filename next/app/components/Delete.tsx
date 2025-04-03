"use client";
import { FormEvent, useState } from "react";

export default function Delete() {
  const [message, setMessage] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<number>(0);
  const addDeleteUserId = (increase: number) => {
    const newUserId = deleteUserId + increase;
    setDeleteUserId(newUserId);
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
  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await deleteUser();
  };
  return (
    <div className={"Box w-80 "}>
      {message !== "" ? (
        <>
          <div className={"select-none"}>{message}</div>
          <button
            onClick={() => {
              setDeleteUserId(0);
              setMessage("");
            }}
          >
            Close
          </button>
        </>
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
  );
}
