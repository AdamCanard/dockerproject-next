import CurrentUser from "./components/CurrentUser";
import Delete from "./components/Delete";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserFile from "./components/UserFile";
import UserList from "./components/UserList";
import UserContextProvider from "./context/usercontext";

export default function Home() {
  return (
    <div className={"flex flex-row w-dvw h-dvh justify-center items-center"}>
      <div className={"flex flex-col justify-center items-center"}>
        <UserContextProvider>
          <CurrentUser />
          <Signup />
          <Login />
          <Delete />
          <UserFile />
        </UserContextProvider>
      </div>
      <UserList />
    </div>
  );
}
