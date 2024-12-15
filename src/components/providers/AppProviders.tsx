"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

const SessionAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <SessionProvider>{children}</SessionProvider>;

const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <TRPCReactProvider>{children}</TRPCReactProvider>;

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <SessionAuthProvider>
      <TRPCProvider>
        <ThemeWrapper>{children}</ThemeWrapper>
      </TRPCProvider>
    </SessionAuthProvider>
  );
};

export default AppProviders;
