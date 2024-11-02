import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { componentStyles, textStyles } from "@/app/styles";
import store from "storejs";
import { endpoints } from "@/constants/endpoints";
import axios from "@/lib/axios/axios-auth";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function UpdateProfileModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: store("name") || "",
    },
  });
  useEffect(() => {
    if (store("name")) {
      form.setValue("username", store("name"));
    }
  }, [store("name")]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await axios.post(endpoints.auth.updateUsername, {
        name: values?.username,
      });
      store("name", values?.username);
      toast.success("Username updated successfully");
      form.reset();
      setOpen(false);
    } catch (error: any) {
      console.log("error", error);
      toast.error(error?.response?.data?.detail || "Something went wrong");
    }
  }
  function handleClose() {
    form.reset();
    setOpen(false);
  }
  const isLoading = form.formState.isLoading;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here.
          </DialogDescription> */}
        </DialogHeader>
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textStyles.formLabel}>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className={componentStyles.formInputMedium}
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter
                className="
               
              flex justify-end gap-0"
              >
                <Button
                  type="button"
                  variant="ghost"
                  className="w-32"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <>Cancel</>
                </Button>
                <Button variant="primary" className="w-32">
                  Change
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
