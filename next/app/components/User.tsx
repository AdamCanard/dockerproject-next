import { IUser } from "../types";

export default function User(props: { user: IUser }) {
  return (
    <div className={"Box w-full flex flex-row justify-between"}>
      <div>UserId: {props.user.userid}</div>
      <div>Password: {props.user.password || '""'}</div>
    </div>
  );
}
