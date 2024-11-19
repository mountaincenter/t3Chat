"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "@/app/_components/Header.tsx/Header";
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
          <div className="flex h-screen flex-col overflow-hidden">
            <Header session={session} />
            <div className="flex-grow overflow-hidden pt-[52px]">
              {children}
            </div>
          </div>
        </TRPCReactProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default SessionProviderWrapper;
