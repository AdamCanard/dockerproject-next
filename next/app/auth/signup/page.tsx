"use client";

import UserModal from "@/app/components/UserModal";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [password, setPassword] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  const router = useRouter();

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const createUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(response);
        setUserId(data.userId);
        setModal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setPassword("");
    await createUser(formData);
  };
  return (
    <div
      className={
        "flex flex-col gap-2 justify-center items-center w-full h-full "
      }
    >
      {modal ? (
        <UserModal userId={userId} />
      ) : (
        <div className={"Box"}>
          <h1>Signup</h1>
          <form
            className={"w-72 flex flex-col gap-2"}
            onSubmit={(e) => handleSubmit(e)}
          >
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
              <button onClick={() => router.push("/auth/login")} type="button">
                {" "}
                Login
              </button>
              <button>Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
