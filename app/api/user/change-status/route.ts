import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Read current users
    const jsonPath = path.join(process.cwd(), "src", "data", "users.json");
    const fileContents = fs.readFileSync(jsonPath, "utf8");
    const data = JSON.parse(fileContents);

    // Find and update user's verified status
    const userIndex = data.users.findIndex((user: any) => user.email === email);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle verified status
    data.users[userIndex].verified = !data.users[userIndex].verified;

    // Write back to file
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        status: "success",
        verified: data.users[userIndex].verified,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
