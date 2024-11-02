"use client";
//create home page for dashboard

import React, { useEffect, useState } from "react";
import useUsers from "@/hooks/use-users";
import { Input } from "@/components/ui/input";
import SearchNavbar from "@/components/ui/dashboard/search-navbar";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/hooks/use-store";
import UpdateUserModal from "@/components/ui/modals/update-user-modal";
import { Switch } from "@/components/ui/switch";
import CreateUserModal from "@/components/ui/modals/create-user-modal";
import { componentStyles } from "@/app/styles";
import UserNavbar from "@/components/ui/dashboard/users/user-navbar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [query, setQuery] = useState("admin");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/user/list-all-users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const { onOpen } = useStore();

  return (
    <div className="w-full h-screen px-4">
      <SearchNavbar
        rightChildren={<UserNavbar />}
        leftChildren={<div className="text-lg font-bold ml-4">Users</div>}
      />
      <UpdateUserModal />
      <CreateUserModal />
      <div className="mt-4 overflow-x-auto mx-4">
        <div className="flex justify-between items-center mb-4">
          {/* <div className="text-lg font-bold capitalize">Users</div> */}
        </div>

        <Table>
          {/* <TableCaption>A list of {query} users.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="">{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={user.verified}
                    onCheckedChange={() => {
                      fetch("/api/user/change-status", {
                        method: "POST",
                        body: JSON.stringify({ email: user.email }),
                      });
                      setUsers((prevUsers: any) =>
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
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this user?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          type="submit"
                          variant="destructive"
                          onClick={() => {
                            fetch("/api/user/delete-user", {
                              method: "POST",
                              body: JSON.stringify({ email: user.email }),
                            });
                            setUsers((prevUsers: any) =>
                              prevUsers.filter(
                                (prevUser: any) => prevUser.email !== user.email
                              )
                            );
                            toast.success("User deleted successfully", {
                              description: user.email,
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>

      <div className="flex justify-between"></div>
    </div>
  );
}
