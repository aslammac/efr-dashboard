"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import image from "@/public/mesh-1.png";
import React from "react";
import PhoneAuth from "@/components/ui/auth/phone-auth";
import RegisterForm from "@/components/ui/auth/register-form";

const Auth = () => {
  const searchParams = useSearchParams();
  let page = searchParams.get("page") ?? "login";
  if (page !== "login" && page !== "register") page = "login";

  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 h-screen">
      <div className="w-[400px] h-[550px] md:w-[400px] md:h-[550px] rounded-2xl flex flex-row absolute blur-[100px] sm:blur-[50px]  left-0 right-0 top-0 bottom-0 m-auto  bg-gradient-to-r from-sky-500/50 to-pink-700/50 dark:from-teal-600-500/50 dark:to-pink-700/50 no-background-animate z-20" />
      <div className="w-full h-screen absolute bottom-0 overflow-clip ">
        <div className="absolute inset-0 z-0 bg-grid-slate-200 opacity-30 dark:opacity-10"></div>

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/10 via-30% to-white dark:from-stone-900 dark:via-stone-900/40 dark:via-30% dark:to-stone-900 "></div>
      </div>
      <div className="flex flex-row items-center  h-[calc(100vh-30px)] justify-center relative z-20">
        <div className=" w-[400px] h-[550px] md:w-[850px] md:h-[550px] bg-white backdrop-blur-md dark:bg-slate-800 rounded-2xl flex flex-row shadow-2xl">
          <div className="hidden md:block md:w-[100%] md:h-[550px] overflow-clip rounded-e-none rounded-2xl">
            <Image
              src={image}
              className="dark:brightness-75"
              style={{
                maxWidth: "100%",
                height: "100%",
                objectFit: "cover",
                position: "relative",
                objectPosition: "right top",
                left: "0",
                top: "0",
              }}
              alt={""}
            />
          </div>
          <div className="relative  w-full md:w-[100%] md:rounded-s-none rounded-sm h-full px-12 ">
            {page === "login" && <PhoneAuth />}
            {page === "register" && <RegisterForm />}
          </div>
        </div>
      </div>
      {/* <div className="hidden md:flex left-0 bottom-2 w-full justify-center items-center z-10">
        <TermsLink name="Terms of Service" link="" />
        <Separator className="w-[1px] h-4"></Separator>
        <TermsLink name="Privacy Policy" link="" />
        <Separator className="w-[1px] h-4"></Separator>
        <TermsLink name="Contact Us" link="" />
      </div> */}
    </div>
  );
};

export default Auth;

const TermsLink = ({ name, link }: { name: string; link: string }) => {
  return (
    <div className="">
      <a href={link} className="text-sky-500 hover:underline text-xs px-2">
        {name}
      </a>
    </div>
  );
};
