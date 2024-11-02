import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../label";
import { componentStyles, layoutStyles } from "@/app/styles";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { endpoints } from "@/constants/endpoints";
import { setCookie } from "cookies-next";
import store from "storejs";
import Image from "next/image";
import image from "@/public/uaepass-signin.png";
import Link from "next/link";
import { Divider } from "primereact/divider";
const PhoneAuth = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verify, setVerify] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Send OTP to phone number
    try {
      setIsPageLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      const data = await response.json();
      setVerify(true);
      if (data.error) {
        setError(data.error);
        return;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsPageLoading(false);
    }
    // Redirect to verify OTP page
  };

  const verifyOTP = async ({
    event,
    otp,
  }: {
    event: React.FormEvent<HTMLFormElement>;
    otp: string;
  }) => {
    event.preventDefault();
    try {
      setIsPageLoading(true);
      // Verify OTP
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber,
          verification_code: otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      const data = await response.json();

      if (data.access_token) {
        setCookie(
          process.env.NEXT_PUBLIC_SESSION_NAME as string,
          data.access_token
        );
        setCookie("email", data.email);
        store(
          (process.env.NEXT_PUBLIC_SESSION_NAME as string) ||
            "gsouq/user_session",
          data.access_token
        );
        toast.success("OTP verified successfully");
        router.replace("/home");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsPageLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-md p-6 sm:p-8 mx-auto min-h-full mt-20"
    >
      {!verify && (
        <SendOTP
          phoneNumber={phoneNumber}
          handleSubmit={handleSubmit}
          setVerify={setVerify}
          setPhoneNumber={setPhoneNumber}
          isPageLoading={isPageLoading}
        />
      )}
      {verify && (
        <VerifyOTP
          phoneNumber={phoneNumber}
          setVerify={setVerify}
          verifyOTP={verifyOTP}
          isPageLoading={isPageLoading}
        />
      )}
    </motion.div>
  );
};

const SendOTP = ({
  handleSubmit,
  setVerify,
  setPhoneNumber,
  phoneNumber,
  isPageLoading,
}: {
  handleSubmit: any;
  setVerify: any;
  setPhoneNumber: any;
  phoneNumber: string;
  isPageLoading: boolean;
}) => {
  const handlePhoneNumberChange = (e: any) => {
    const value = e.target.value;
    const maxLength = 10; // Set your desired limit here

    // Allow only digits and limit length
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-6 max-w-xs mx-auto">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Verify Your Identity</h1>
        {/* <p className="text-sm md:text-sm text-muted-foreground">
          Enter your phone number to continue verification process.
        </p> */}
      </div>
      <form onSubmit={handleSubmit} className="mt-12 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 w-full mb-2">
          <div className="grid gap-1">
            <Select>
              <SelectTrigger
                className={`${componentStyles.smFormInput} md:w-24`}
              >
                <SelectValue placeholder="+971" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+971">+971</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1 w-full">
            <Input
              id="phone-number"
              type="tel"
              placeholder="Mobile Number"
              className={`${componentStyles.smFormInput} w-full`}
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
              required
            />
          </div>
        </div>
        <Button
          className="w-full rounded-xl"
          variant={"primary"}
          size={"lg"}
          disabled={isPageLoading}
        >
          {isPageLoading ? <Loader2 className="animate-spin" /> : "Send Code"}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-800 px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <div className="flex-col justify-center mt-4 flex items-center min-w-full max-w-xl">
        <Image
          src={image}
          alt="uaepass"
          width={320}
          onClick={() => {
            console.log("clicked");
          }}
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth?page=register"
            className="text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

const VerifyOTP = ({
  phoneNumber,
  setVerify,
  verifyOTP,
  isPageLoading,
}: {
  phoneNumber: string;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifyOTP: ({
    event,
    otp,
  }: {
    event: React.FormEvent<HTMLFormElement>;
    otp: string;
  }) => Promise<void>;
  isPageLoading: boolean;
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it reaches 0
    }
  }, [isTimerActive, timer]);
  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  const handleResendOTP = () => {
    // Logic to resend OTP
    console.log("Resend OTP");

    // Reset timer
    setTimer(10);
    setIsTimerActive(true);
  };

  return (
    <div>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Enter Your OTP</h1>
        <p className="text-sm md:text-sm text-muted-foreground">
          Enter the 6-digit code sent to {phoneNumber.slice(0, 2)}******
          {phoneNumber.slice(8, 10)}
          <span
            className="cursor-pointer text-primary"
            onClick={() => setVerify(false)}
          >
            {" "}
            Change
          </span>
        </p>
      </div>
      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => verifyOTP({ event, otp })}
      >
        <div className=" flex justify-center flex-col items-center space-y-2">
          <label
            htmlFor="otp"
            className="text-right text-sm font-medium"
          ></label>
          <InputOTP
            id="otp"
            maxLength={6}
            pattern="^[0-9]+$"
            className="col-span-1"
            onChange={(otp: string) => {
              setOtp(otp);
              console.log(otp);
            }}
            value={otp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-sm flex w-full justify-end md:pr-6">
            {isTimerActive ? (
              <span className="">{formattedTimer}</span>
            ) : (
              <div className="flex gap-2">
                {/* <p className="text-muted-foreground">{`Didn't receive OTP?`}</p> */}
                <button
                  onClick={handleResendOTP}
                  className="text-primary cursor-pointer"
                >
                  Send Again
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <Button className="w-full rounded-xl" variant={"primary"} size={"lg"}>
          Verify
        </Button> */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            type="submit"
            disabled={otp.length !== 6 || isPageLoading}
            className=" w-14 rounded-full h-14"
          >
            {isPageLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ChevronRight className="text-white" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhoneAuth;
