"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

import React from "react";

interface SessionProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCReactProvider>
          <SidebarProvider>
            {/* Sidebar */}
            <AppSidebar />

            {/* Main content area */}
            {/* Sidebar Trigger */}
            <SidebarTrigger />

            {/* Centered children */}
            <div className="w-full items-center justify-center">{children}</div>
          </SidebarProvider>
        </TRPCReactProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default SessionProviderWrapper;
