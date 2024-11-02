import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the JSON file
    const jsonPath = path.join(process.cwd(), "src", "data", "users.json");
    const fileContents = fs.readFileSync(jsonPath, "utf8");
    const users = JSON.parse(fileContents).users;

    // Calculate statistics
    const totalUsers = users.length;
    const verifiedUsers = users.filter((user: any) => user.verified).length;
    const notVerifiedUsers = totalUsers - verifiedUsers;

    // Return the statistics
    return NextResponse.json(
      {
        status: "success",
        statistics: {
          totalUsers,
          verifiedUsers,
          notVerifiedUsers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading users:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
