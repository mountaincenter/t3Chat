"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import PusherBeamsClient from "@/lib/PuserBeamsClient";

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
        <ThemeWrapper>
          {children}
          <PusherBeamsClient />
          {/* 非同期でPusher BeamsのSDKをロード */}
          <Script
            src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"
            strategy="lazyOnload" // ページ読み込み後に非同期でロード
          />
        </ThemeWrapper>
      </TRPCProvider>
    </SessionAuthProvider>
  );
};

export default AppProviders;
