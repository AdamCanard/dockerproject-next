import { useState } from "react";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  return (
    <>
      {userList.map((user) => {
        return <User user={user} />;
      })}
    </>
  );
}
