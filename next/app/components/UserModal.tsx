export default function UserModal(props: {
  userId: number;
  close: () => void;
}) {
  return (
    <>
      {" "}
      <div> Your userId is {props.userId}</div>
      <div>DON&apos;T FORGET IT</div>
      <button type="button" onClick={() => props.close()}>
        Close
      </button>
    </>
  );
}
