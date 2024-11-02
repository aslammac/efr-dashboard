import { SyncLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  //   return <ClipLoader color="#0369a1" />;
  return (
    <div className="flex justify-center items-center h-full w-full">
      <SyncLoader color="#0284c7" size={8} speedMultiplier={1} />
    </div>
  );
}
