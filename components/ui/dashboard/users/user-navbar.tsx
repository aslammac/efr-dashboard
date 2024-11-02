import React from "react";
import { Button } from "../../button";
import { SearchIcon, UserPlus } from "lucide-react";
import { Input } from "../../input";
import useStore from "@/hooks/use-store";

export default function UserNavbar() {
  const { onOpen } = useStore();
  return (
    <div className="flex items-center justify-between gap-4">
      {/* <div className="text-lg font-bold ml-4">Users</div> */}
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search"
            className="w-64 pl-8 outline-none border-none shadow-none bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      {/* <div className="items-center rounded-full">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => onOpen("create-user")}
        >
          <div className="flex items-center gap-2 ">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </div>
        </Button>
      </div> */}
    </div>
  );
}
