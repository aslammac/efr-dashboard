"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import MediaQuery from "react-responsive";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/use-store";
import { AnimatePresence, motion } from "framer-motion";

type NavigationItemProps = {
  id: string;
  icon?: React.JSX.Element;
  name: string;
  className?: string;
  onClick?: () => void;
  isSubmenu?: boolean;
};

export const NavigationItem = ({
  id,
  name,
  icon,
  className,
  onClick,
  isSubmenu = false,
}: NavigationItemProps) => {
  const { menuNav: menu, expand } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <div className={cn(className)}>
        <MediaQuery maxWidth={1023}>
          <ActionTooltip side="right" align="center" label={name}>
            <button
              onClick={onClick}
              className="group relative flex items-center"
            >
              <div
                className={cn(
                  "absolute left-0 bg-primary rounded-r-full transition-transform w-[4px]",
                  "group-hover:h-[20px]",
                  "h-[0px]"
                )}
              />

              <div
                className={cn(
                  "relative group mx-3 h-14 w-14 lg:w-52 group-hover:translate-x-1 transition-transform ease-in overflow-hidden flex justify-center items-center rounded-full",
                  menu === id
                    ? " text-slate-200"
                    : "bg-primary/10 text-slate-700 dark:text-slate-200"
                )}
              >
                {icon}
                {menu === id && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-green-500 z-0 flex justify-center items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {icon}
                  </motion.span>
                )}
              </div>
            </button>
          </ActionTooltip>
        </MediaQuery>

        <MediaQuery minWidth={1024}>
          <AnimatePresence mode="wait">
            {!expand && (
              <ActionTooltip side="right" align="center" label={name}>
                <button
                  onClick={onClick}
                  className="group relative flex items-center"
                >
                  <div
                    className={cn(
                      "absolute left-0 bg-primary rounded-r-full transition-transform w-[4px]",
                      "group-hover:h-[20px]",
                      "h-[0px]"
                    )}
                  />

                  <div
                    className={cn(
                      "relative group mx-3 h-14 group-hover:translate-x-1 transition-transform ease-in overflow-hidden flex justify-center items-center rounded-full",
                      menu === id
                        ? " text-slate-200"
                        : "bg-primary/10 text-slate-700 dark:text-slate-200",
                      expand ? "w-52" : "w-14"
                    )}
                  >
                    {icon}
                    {menu === id && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-green-500 z-0 flex justify-center items-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {icon}
                      </motion.span>
                    )}
                  </div>
                </button>
              </ActionTooltip>
            )}
            {expand && (
              <button
                onClick={onClick}
                className="group relative flex items-center z-10 w-full py-1"
              >
                <div
                  className={cn(
                    "absolute left-0 rounded-r-full transition-transform w-[4px]",
                    "group-hover:h-[20px]",
                    "h-[0px]"
                  )}
                />

                <motion.div
                  whileHover="hover"
                  className={cn(
                    "relative group flex mx-0 h-12 w-14 lg:w-56  overflow-hidden justify-start items-center gap-2 px-5 text-sm  font-medium rounded-full",
                    menu === id
                      ? "bg-green-500 dark:bg-slate-700  "
                      : "bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-200 ",
                    isSubmenu && "pl-[52px]"
                  )}
                >
                  {icon}
                  {name}
                  <motion.div
                    initial={{ opacity: 0 }}
                    variants={{
                      hover: {
                        opacity: 1,
                        // scale: 1.5,
                        // translateY: 30,
                        // translateX: 30,
                      },
                    }}
                    // layoutId="menu"
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      " absolute h-40 w-40  rounded-full bg-gradient-to-r  -z-30 -left-10 -bottom-10 blur-xl",
                      menu === id
                        ? "bg-green-600 dark:bg-primary/30 text-slate-200  "
                        : "bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-200 group-hover:bg-slate-300 group-hover:dark:bg-zinc-700/40"
                    )}
                  ></motion.div>
                </motion.div>
              </button>
            )}
          </AnimatePresence>
        </MediaQuery>
      </div>
    );
};
