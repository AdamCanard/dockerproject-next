import UserFile from "./components/UserFile";
import UserContextProvider from "./context/usercontext";

export default function Home() {
  return (
    <div className={"flex w-dvw h-dvh justify-center items-center"}>
      <UserContextProvider>
        <UserFile />
      </UserContextProvider>
    </div>
  );
}
