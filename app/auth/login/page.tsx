"use client";

import { ChangeEvent, useState } from "react";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={"w-full h-full bg-black"}>
      <form>
        <label>Username:</label>
        <input
          name="username"
          value={username}
          onChange={(e) => {
            handleUsername(e);
          }}
        />
        <label>Password:</label>
        <input
          name="password"
          value={password}
          onChange={(e) => {
            handlePassword(e);
          }}
        />
        <div className={"w-full flex flex-row justify-between"}>
          <button>Submit</button>
          <button type="button"> Sign Up</button>{" "}
        </div>
      </form>
    </div>
  );
}
