"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";

type Props = {
  isDark?: boolean;
};

export function ThemeToggle({ isDark }: Props) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-transparent rounded-full border-0 "
      onClick={() => toggleTheme()}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 ${
          isDark ? "text-slate-200" : "text-sky-700"
        }`}
      />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
