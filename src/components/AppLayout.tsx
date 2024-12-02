"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import SidebarLayout from "@/components/layouts/SidebarLayout";

interface AppLayoutProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, defaultOpen }) => {
  return (
    <SessionProvider>
      <SidebarLayout defaultOpen={defaultOpen}>{children}</SidebarLayout>
    </SessionProvider>
  );
};

export default AppLayout;
