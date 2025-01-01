import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

import SidebarInsetComponent from "@/components/common/Sidebar/SidebarInsetComponent";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  defaultOpen: boolean;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  sidebar,
  defaultOpen,
}) => {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      {sidebar}
      <SidebarInsetComponent>{children}</SidebarInsetComponent>
    </SidebarProvider>
  );
};

export default SidebarLayout;
