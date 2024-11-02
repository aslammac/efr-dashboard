import React from "react";
import { Metadata } from "next";
import { pageDetails } from "@/constants";
import { PageWrapper } from "@/components/page-wrapper";
import SideBar from "@/components/navigation/sidebar";
import MobileSidebar from "@/components/navigation/mobile-sidebar";
import { Suspense } from "react";

export const metadata: Metadata = pageDetails.dashboard;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageWrapper>
        <div className="flex">
          <SideBar></SideBar>
          <MobileSidebar />
          {children}
        </div>
      </PageWrapper>
    </Suspense>
  );
};

export default DashboardLayout;
