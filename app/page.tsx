"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">Welcome to KloudFairy</h1>
        <div className="ml-auto flex justify-center gap-5">
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </main>
  );
}
