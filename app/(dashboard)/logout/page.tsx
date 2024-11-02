"use client";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import store from "storejs";
const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear any auth tokens/session data
    deleteCookie(process.env.NEXT_PUBLIC_SESSION_NAME as string);
    store.clear();
    // Redirect to login page
    router.replace("/auth");
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-lg">Logging out...</div>
    </div>
  );
};

export default LogoutPage;
