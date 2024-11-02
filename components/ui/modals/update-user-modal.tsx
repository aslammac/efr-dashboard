"use client";

import axios from "@/lib/axios/axios-auth";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useSWRConfig } from "swr";
import useStore from "@/hooks/use-store";
import { endpoints } from "@/constants/endpoints";

const formSchema = z.object({
  is_active: z.boolean(),
});

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    user_role: string;
    is_active: boolean;
  };
}

export default function UpdateUserModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { onClose, data, isOpen: open, type } = useStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_active: data?.is_active,
    },
  });

  useEffect(() => {
    if (open && data !== null && type == "update-user") {
      form.reset(data);
    }
  }, [open, data, type]);

  const isOpen = open && data !== null && type == "update-user";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.post(endpoints.user.updateProfile, {
        user_id: data?.id,
        is_active: values.is_active,
      });
      await mutate(endpoints.user.getUsers(data?.user_role));
      toast.success("User updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User Status</DialogTitle>
          <DialogDescription>
            Change the user&apos;s active status here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
