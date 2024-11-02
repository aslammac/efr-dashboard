import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import path from "path";

// Define types for better type safety
import { User } from "@/types";

// Update types for array structure
interface Users {
  users: User[];
}

// Read users from JSON file with better error handling
const getUsersFromFile = async (): Promise<Users> => {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "users.json");
    await fs.access(filePath).catch(async () => {
      // Initialize with empty users array
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify({ users: [] }, null, 2));
    });

    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    // Handle potential double nesting
    return { users: data.users?.users || data.users || [] };
  } catch (error) {
    console.error("Error reading users file:", error);
    return { users: [] };
  }
};

// Save users to JSON file with better error handling
const saveUsersToFile = async (users: Users): Promise<void> => {
  try {
    const dirPath = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dirPath, "users.json");

    // Ensure directory exists
    await fs.mkdir(dirPath, { recursive: true });

    // Write file directly with users array, no extra nesting
    await fs.writeFile(
      filePath,
      JSON.stringify({ users: users.users }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error saving users:", error);
    throw new Error(`Failed to save users: ${error}`);
  }
};

const generateJWT = async (email: string): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, mobile, name, password } = body;

    // Validation
    if (!email || !mobile || !name || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    // Get existing users
    const { users } = await getUsersFromFile();

    // Check for existing user
    if (users.some((user) => user.email === email || user.mobile === mobile)) {
      console.log("User already exists");
      console.log(users);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser: User = {
      email,
      mobile,
      name,
      password,
      createdAt: new Date().toISOString(),
      verified: false,
    };

    // Add user to array and save
    users.push(newUser);
    await saveUsersToFile({ users });

    // Generate JWT
    const token = await generateJWT(email);

    return NextResponse.json({
      message: "User registered successfully",
      access_token: token,
      email,
      user: {
        email,
        name,
        mobile,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
