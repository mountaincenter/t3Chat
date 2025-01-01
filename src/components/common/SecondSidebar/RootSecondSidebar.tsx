import React from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarInput,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import type { Item } from "@/app/types";

interface SecondSidebarProps {
  activeItem: Item | undefined;
}

const RootSecondSidebar: React.FC<SecondSidebarProps> = () => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground"></div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Unreads</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default RootSecondSidebar;
