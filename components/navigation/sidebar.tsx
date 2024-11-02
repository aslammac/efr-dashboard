"use client";
import React, { useEffect, useState } from "react";
import { NavigationItem } from "@/components/navigation/navigation-item";
import {
  ActivitySquare,
  ChevronRight,
  Cloud,
  FolderKanban,
  FolderUp,
  Grip,
  Layers,
  Lightbulb,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useStore } from "@/hooks/use-store";

import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import MediaQuery from "react-responsive";
import Image from "next/image";
import logo from "@/public/logo-main.png";
import icon from "@/public/logo-main.png";

interface SubmenuItem {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  icon: JSX.Element;
  submenu?: SubmenuItem[];
}
const menuObject: MenuItem[] = [
  {
    id: "home",
    name: "Dashboard",
    icon: <FolderKanban className="h-4" />,
  },
  {
    id: "orders",
    name: "Orders",
    icon: <Grip className="h-4" />,
  },
  {
    id: "users",
    name: "Users",
    icon: <Users className="h-4" />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="h-4" />,
  },
  {
    id: "logout",
    name: "Logout",
    icon: <LogOut className="h-4" />,
  },
];

export default function SideBar() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState("");
  const params = useSearchParams();
  const { setMenuNav, expand, setExpand } = useStore();
  const menuURL = params?.get("menu");
  const menuList = menuObject;

  const handler = ({
    id,
    parentId,
    isParent,
  }: {
    id: string;
    parentId?: string;
    isParent: boolean;
  }) => {
    if (isParent) {
      // Toggle the parent menu (expand/collapse)
      setExpandedMenu((prev) => (prev === id ? "" : id));
    } else {
      // Close expanded menu if it's not the parent of the clicked item
      if (expandedMenu && parentId !== expandedMenu) {
        setExpandedMenu("");
        setMenuNav(id);
        router.push(`/${id}`);
      } else {
        // Set the new menu
        setMenuNav(id);
        router.push(`/${id}`);
      }
    }
  };
  useEffect(() => {
    const pathSegment = pathname.split("/")[1];
    setMenuNav(pathSegment);
    setIsClient(true);
    menuList.forEach((item) => {
      if (item.submenu) {
        const submenuItem = item.submenu.find((sub) => sub.id === pathSegment);
        if (submenuItem) {
          setExpandedMenu(item.id);
        }
      }
    });
  }, [pathname]);

  const handleMenuClick = (menuId: string) => {
    setExpandedMenu((prev) => (prev === menuId ? "" : menuId));
  };
  return (
    isClient && (
      <>
        <MediaQuery maxWidth={1023}>
          <motion.div
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative bg-slate-200/60 dark:bg-slate-800/50 h-screen mb-0 w-20 lg:w-56 flex-none hidden sm:flex flex-col justify-between pt-0 pb-2 lg:pt-16 lg:pb-0 items-center overflow-clip shadow-lg "
          >
            <div className="flex flex-col gap-4 lg:gap-0 mt-6 lg:mt-0">
              <motion.div>
                <div className="flex gap-2 px-3 items-center overflow-clip">
                  <Image className="w-32 rounded-full" src={icon} alt="icon" />
                </div>
              </motion.div>
              <Separator className="mt-0 bg-slate-300 dark:bg-slate-600" />
              {menuList.map((item) => (
                <div key={item.id}>
                  <NavigationItem
                    id={item.id}
                    icon={item.icon}
                    name={item.name}
                    onClick={() =>
                      handler({
                        id: item.id,
                        isParent: item.submenu ? true : false,
                      })
                    }
                  />
                  <AnimatePresence mode="wait">
                    {item.submenu && expandedMenu === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-0 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <NavigationItem
                            key={subItem.id}
                            id={subItem.id}
                            name={subItem.name}
                            isSubmenu
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </MediaQuery>

        {/* Expandable sidebar */}
        <MediaQuery minWidth={1024}>
          <motion.div
            initial={{ width: expand ? "15rem" : "5rem" }}
            variants={{
              expand: { width: "15rem" },
              normal: { width: "5rem" },
            }}
            animate={expand ? "expand" : "normal"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative bg-slate-200/60 dark:bg-slate-800/50  h-screen mb-0  flex-none flex flex-col justify-between pt-10 pb-0 lg:pt-3 lg:pb-0 items-center overflow-clip shadow-lg px-2"
          >
            <div
              className="absolute cursor-pointer -right-4 bottom-4 rounded-full bg-slate-400 text-white w-10 h-8 flex justify-start items-center"
              onClick={() => setExpand(!expand)}
            >
              <motion.div
                variants={{
                  expand: { rotate: 180 },
                  normal: { rotate: 0 },
                }}
              >
                <ChevronRight height={16} className="dark:text-slate-200" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className={`flex flex-col ${
                expand ? "gap-0 mt-0" : "gap-4 mt-2"
              } ${expand ? " -mt-2" : ""}`}
            >
              {expand && (
                <>
                  <motion.div>
                    {expand && (
                      <div className="flex gap-2 px-8 items-center overflow-clip pt-4">
                        <Image className="w-20" src={logo} alt="icon" />
                      </div>
                    )}
                  </motion.div>
                  <Separator className="mt-4 mb-4 hidden lg:block bg-slate-300 dark:bg-slate-600" />
                </>
              )}
              {!expand && (
                <>
                  <motion.div>
                    <div className="flex gap-2 px-3 items-center overflow-clip">
                      <Image
                        className="w-32 rounded-full"
                        src={icon}
                        alt="icon"
                      />
                    </div>
                  </motion.div>
                  <Separator className="mt-0 hidden lg:block bg-slate-300 dark:bg-slate-600" />
                </>
              )}

              {menuList.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between relative">
                    <NavigationItem
                      id={item.id}
                      icon={item.icon}
                      name={item.name}
                      onClick={() =>
                        handler({
                          id: item.id,
                          isParent: item.submenu ? true : false,
                        })
                      }
                    />
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: expandedMenu === item.id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-2 z-20"
                      >
                        <ChevronRight className="h-4" />
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.submenu && expandedMenu === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-0 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <NavigationItem
                            key={subItem.id}
                            id={subItem.id}
                            name={subItem.name}
                            isSubmenu
                            onClick={() =>
                              handler({
                                id: subItem.id,
                                isParent: false,
                                parentId: item.id,
                              })
                            }
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </MediaQuery>
      </>
    )
  );
}
