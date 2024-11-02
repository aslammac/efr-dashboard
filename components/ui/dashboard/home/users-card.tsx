import React, { useState } from "react";
import { Card } from "primereact/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { users } from "@/src/data/users.json";

const avatars = [
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_21.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_6.png",
];

export default function UsersCard() {
  const [unverifiedUsers, setUnverifiedUsers] = useState(users.slice(0, 3));
  const router = useRouter();

  return (
    <div className="col-span-6 lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-lg shadow card">
      <h3 className="text-lg font-semibold mb-4">Pending User Approvals</h3>
      <div className="space-y-4">
        {unverifiedUsers.map((user) => (
          <div key={user.email} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={avatars[Math.floor(Math.random() * avatars.length)]}
                  alt={user.name}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium capitalize">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            {user.verified ? (
              <div className="flex items-center text-green-600 text-sm font-medium gap-1">
                <CheckIcon className="w-4 h-4" />
                <span>Verified</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => {
                  fetch("/api/user/change-status", {
                    method: "POST",
                    body: JSON.stringify({ email: user.email }),
                  });
                  setUnverifiedUsers((prevUsers: any) =>
                    prevUsers.map((prevUser: any) =>
                      prevUser.email === user.email
                        ? { ...prevUser, verified: !prevUser.verified }
                        : prevUser
                    )
                  );
                  toast.success("Status updated successfully", {
                    description: user.email,
                  });
                }}
              >
                Approve
              </Button>
            )}
          </div>
        ))}
        <div className="pt-2 ">
          <Button
            className="w-full dark:bg-slate-700"
            variant="outline"
            onClick={() => router.push("/users")}
          >
            View All Users
          </Button>
        </div>
      </div>
    </div>
  );
}
