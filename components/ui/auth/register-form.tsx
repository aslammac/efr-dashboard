"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { validationMessages } from "@/constants";
import { endpoints } from "@/constants/endpoints";
import { setCookie } from "cookies-next";
import { cn } from "@/lib/utils";
import { componentStyles } from "@/app/styles";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, validationMessages.name),
  email: z.string().email(validationMessages.email),
  mobile: z.string().min(10, validationMessages.phone),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      if (result.access_token) {
        setCookie(
          process.env.NEXT_PUBLIC_SESSION_NAME as string,
          result.access_token
        );
        setCookie("email", result.email);
        router.push("/home");
        toast.success("Registration successful!");
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-6 max-w-xs mx-auto">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="">
          <Input
            id="name"
            placeholder="Name"
            {...register("name")}
            disabled={isLoading}
            className={componentStyles.formInputCommon}
          />
          {errors.name && (
            <p className={componentStyles.formError}>{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-0">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            id="email"
            type="email"
            placeholder="Email  "
            {...register("email")}
            disabled={isLoading}
            className={componentStyles.formInputCommon}
          />
          {errors.email && (
            <p className={componentStyles.formError}>{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-0">
          <Input
            id="mobile"
            placeholder="Mobile Number"
            {...register("mobile")}
            disabled={isLoading}
            maxLength={10}
            className={componentStyles.formInputCommon}
          />
          {errors.mobile && (
            <p className={componentStyles.formError}>{errors.mobile.message}</p>
          )}
        </div>

        <div className="space-y-0">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
            disabled={isLoading}
            className={componentStyles.formInputCommon}
          />
          {errors.password && (
            <p className={componentStyles.formError}>
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          className="w-full font-semibold rounded-xl"
          type="submit"
          disabled={isLoading}
          size="lg"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
