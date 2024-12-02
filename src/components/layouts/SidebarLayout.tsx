import React from "react";
import { ThemeProvider } from "../theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Sidebar from "@/components/common/Sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  defaultOpen,
}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          {/* Sidebar Trigger */}

          {/* Centered children */}
          <div className="w-full items-center justify-center">{children}</div>
        </SidebarProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
};

export default SidebarLayout;
