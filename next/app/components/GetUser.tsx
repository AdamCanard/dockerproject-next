"use client";
import { useState } from "react";

export default function GetUser() {
  const [getUserId, setGetUserId] = useState(0);
  const [userData, setUserData] = useState({});

  const handleClick = async () => {
    try {
      const response = await fetch("/api/user/" + getUserId, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserData(data);
        console.log(response);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <div className={"Box w-full flex justify-between flex-col"}>
      {Object.keys(userData).length === 0 ? (
        <>
          <label>UserId:</label>
          <div className={"flex flex-row justify-around w-full"}>
            <input
              className={"w-full text-center"}
              name="userId"
              value={getUserId}
              onChange={(e) => setGetUserId(+e.target.value)}
            />
          </div>
          <button onClick={() => handleClick()}>Get User</button>
        </>
      ) : (
        <>
          {JSON.stringify(userData)}

          <button onClick={() => setUserData({})}>Close</button>
        </>
      )}
    </div>
  );
}
