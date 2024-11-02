"use client";
import { useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import { SyncLoader } from "react-spinners";

export default function DashboardMain() {
  const { isLoadingPage, setIsLoadingPage } = useStore();
  useEffect(() => {
    setIsLoadingPage(false);
  }, []);
  if (isLoadingPage) {
    return (
      <div className="h-screen flex justify-center items-center">
        <SyncLoader color="#0284c7" size={8} speedMultiplier={1} />
      </div>
    );
  }
  return <></>;
}
