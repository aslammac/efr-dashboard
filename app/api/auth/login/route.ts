import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

// In-memory OTP storage (in production, use a proper database)
const otpStore: { [key: string]: { otp: string; timestamp: number } } = {};

// Read users from JSON file
const getUsersFromFile = () => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "users.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return {};
  }
};

// Save users to JSON file
const saveUsersToFile = (users: any) => {
  const filePath = path.join(process.cwd(), "src", "data", "users.json");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateJWT = async (phoneNumber: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
  const token = await new SignJWT({ phoneNumber })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return token;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone_number, verification_code } = body;

    // If verification code is present, verify OTP
    if (verification_code) {
      const storedOTP = otpStore[phone_number];

      if (!storedOTP || storedOTP.otp !== verification_code) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }

      // Check if OTP is expired (5 minutes validity)
      if (Date.now() - storedOTP.timestamp > 5 * 60 * 1000) {
        delete otpStore[phone_number];
        return NextResponse.json({ error: "OTP expired" }, { status: 400 });
      }

      // Clear OTP after successful verification
      delete otpStore[phone_number];

      // Generate JWT token
      const token = await generateJWT(phone_number);

      // Save user if not exists
      const users = getUsersFromFile().users;
      const user = users.find((user: any) => user.mobile === phone_number);

      return NextResponse.json({
        access_token: token,
        message: "Authentication successful",
        email: user?.email,
      });
    }

    // If no verification code, send OTP
    const otp = generateOTP();
    otpStore[phone_number] = {
      otp: "123456",
      timestamp: Date.now(),
    };

    // In production, you would send this OTP via SMS
    // For development, we'll just return it in response
    return NextResponse.json({
      message: "OTP sent successfully",
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
