import { NextResponse } from "next/server";
import { UsersData } from "@/types";
import { createJsonFileUtil } from "@/lib/file-util";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const usersFile = createJsonFileUtil<UsersData>("users.json");

    await usersFile.update((currentData) => ({
      users: currentData.users.filter((user) => user.email !== email),
    }));

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
