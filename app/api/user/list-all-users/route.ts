import { NextResponse } from "next/server";
import { getUsersFromFile } from "@/lib/file-util";

// Read users from JSON file with error handling

export async function GET() {
  try {
    const { users } = await getUsersFromFile();

    return NextResponse.json(
      {
        status: "success",
        users: users.map((user: any) => ({
          email: user.email,
          name: user.name,
          mobile: user.mobile,
          verified: user.verified,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
