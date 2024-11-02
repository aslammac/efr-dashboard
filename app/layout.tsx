import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { pageDetails } from "@/constants";
import { Toaster } from "sonner";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const font = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600"],
});

export const metadata: Metadata = pageDetails.home;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="bg-transparent">
      <body className={cn(font.className, "bg-white dark:bg-black-pearl-950")}>
        <PrimeReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="theme"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
