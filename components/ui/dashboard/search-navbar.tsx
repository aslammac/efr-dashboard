"use client";
import { getCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useEffect } from "react";
import { useState } from "react";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../button";
import { useTheme } from "next-themes";
import { useStore } from "@/hooks/use-store";

export default function SearchNavbar({
  leftChildren,
  rightChildren,
}: {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
}) {
  const email = getCookie("email");
  const [user, setUser] = useState<any>(null);
  const { setTheme } = useTheme();
  const { setMobileNav } = useStore();
  useEffect(() => {
    if (email) {
      fetch(`/api/user/get-user?email=${email}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <div className="flex justify-between gap-2 w-full rounded-full p-2 mr-4 bg-gray-100 dark:bg-slate-700 shadow-sm mt-4 sticky top-4 z-50 border-b">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden "
          onClick={() => setMobileNav(true)}
        >
          <Menu size={20} />
        </Button>
        {leftChildren}
      </div>
      <div className="flex items-center gap-2">
        {rightChildren}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Bell size={20} className=" mr-2 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 mt-4">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-gray-500">
              No notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <div className="flex items-center gap-2 cursor-pointer bg-slate-400 rounded-full pr-2">
            <Avatar>
              <AvatarImage
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_22.png"
                alt="@profile"
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm capitalize font-mono text-white">
              {user?.name}
            </p>
            {/* <ChevronDown size={16} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
