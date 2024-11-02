"use client";

//create home page for dashboard

import React, { useState } from "react";
import { Metadata } from "next";
import SearchNavbar from "@/components/ui/dashboard/search-navbar";
import UserNavbar from "@/components/ui/dashboard/users/user-navbar";
import data from "@/src/data/users.json";
import { useRouter } from "next/navigation";
import ChartGallery from "@/components/ui/dashboard/home/chart-gallery";
import UsersCard from "@/components/ui/dashboard/home/users-card";
import { basicMetrics } from "@/src/data/users.json";
import { Card } from "primereact/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle } from "lucide-react";
import InventoryCard from "@/components/ui/dashboard/home/inventory-card";

export default function Home() {
  return (
    <div className="w-full h-screen px-4 overflow-y-auto pb-10">
      <SearchNavbar
        leftChildren={
          <div className="text-lg font-normal ml-4 ">Dashboard</div>
        }
        rightChildren={undefined}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6 ">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 min-h-20 relative overflow-hidden ">
          <div className="flex justify-between items-center">
            <div className=" text-white">
              <div className="absolute -bottom-20 left-20 w-32 h-32 rounded-lg bg-white/10 rotate-12"></div>
              <p className="text-sm opacity-90 relative">Total Sales</p>
              <p className="text-2xl font-bold relative">
                AED {basicMetrics.totalSales.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div className=" text-white">
              <div className="absolute -top-16 left-40 w-40 h-40 rounded-full bg-white/10"></div>
              <div className="absolute left-4 bottom-40 w-16 h-16 rounded-lg rotate-12 bg-white/10"></div>
              <p className="text-sm opacity-90 relative">Total Orders</p>
              <p className="text-2xl font-bold relative">
                {basicMetrics.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div className=" text-white">
              <div className="absolute -top-6 -right-12 w-32 h-52 rounded-full bg-white/10"></div>
              <p className="text-sm opacity-90 relative">Pending Orders</p>
              <p className="text-2xl font-bold relative">
                {basicMetrics.pendingOrders}
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* </div> */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-6 ">
        <ChartGallery />
        <div className="col-span-6 lg:col-span-2 space-y-6">
          <UsersCard />
          <InventoryCard />
        </div>
      </div>
    </div>
  );
}
