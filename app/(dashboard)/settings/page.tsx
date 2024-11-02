"use client";

import { useState } from "react";
import SearchNavbar from "@/components/ui/dashboard/search-navbar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    darkMode: theme === "dark",
    emailNotifications: true,
    pushNotifications: false,
    autoSave: true,
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
    toast.success("Setting updated successfully");
  };

  return (
    <div className="w-full h-screen px-4 flex flex-col items-center">
      <SearchNavbar
        leftChildren={<div className="text-lg font-normal ml-4">Settings</div>}
        rightChildren={undefined}
      />

      <div className="mt-6 ml-4 max-w-2xl w-full lg:w-1/2 bg-white dark:bg-slate-800 rounded-lg shadow p-4 space-y-8 ">
        <div className=" rounded-lg p-4 space-y-8 ">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            <div className="flex items-center justify-between gap-10">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-500 ">
                  Toggle dark mode for the dashboard
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => {
                  setTheme(checked ? "dark" : "light");
                  handleSettingChange("darkMode", checked);
                }}
              />
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive push notifications for important updates
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("pushNotifications", checked)
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">General</h3>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save">Auto Save</Label>
                <p className="text-sm text-gray-500">
                  Automatically save changes as you make them
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) =>
                  handleSettingChange("autoSave", checked)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
