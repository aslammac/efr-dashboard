import React from "react";
import { Metadata } from "next";
import { pageDetails } from "@/constants";
import { PageWrapper } from "@/components/page-wrapper";

export const metadata: Metadata = pageDetails.auth;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageWrapper>
      <div className="">{children}</div>
    </PageWrapper>
  );
};

export default AuthLayout;
