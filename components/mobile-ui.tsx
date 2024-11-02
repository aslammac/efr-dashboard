import warning from "@/public/warning.png";
import React from "react";
import Image from "next/image";

export default function MobileUI() {
  return (
    <React.Fragment>
      <div className=" sm:hidden w-[400px] h-[550px] md:w-[850px] md:h-[550px] rounded-2xl flex flex-row absolute blur-[100px] sm:blur-[50px]  left-0 right-0 top-0 bottom-0 m-auto  bg-gradient-to-r from-sky-500/50 to-pink-700/50 dark:from-teal-600-500/50 dark:to-pink-700/50 no-background-animate" />
      <div className="sm:hidden flex flex-col items-center justify-center h-screen text-xl w-full z-30">
        <Image
          src={warning}
          alt={"Warning"}
          width={70}
          height={70}
          className="mb-4"
        ></Image>
        <div className="text-center">
          For better experience, please use a desktop browser.
        </div>
      </div>
    </React.Fragment>
  );
}
