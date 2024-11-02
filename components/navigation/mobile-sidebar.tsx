"use client";
import { Sidebar } from "primereact/sidebar";
import { useStore } from "@/hooks/use-store";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { FolderKanban, Grip, Users, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MobileSidebar() {
  const { mobileNav, setMobileNav } = useStore();
  const router = useRouter();

  const menuItems = [
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

  return (
    <Sidebar
      visible={mobileNav}
      onHide={() => setMobileNav(false)}
      className="w-64 p-4"
    >
      <div className="flex flex-col gap-8 ">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-lg font-bold flex items-center gap-2"
            onClick={() => {
              setMobileNav(false);
              router.push(`/${item.id}`);
            }}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
    </Sidebar>
  );
}
