"use client";

import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";

import React from "react";

const SessionProviderWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ThemeProvider>
  );
};

export default SessionProviderWrapper;
