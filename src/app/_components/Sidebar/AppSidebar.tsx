"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarInput,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";

import { data } from "@/components/common/Sidebar/data";
import NavUser from "@/components/common/Sidebar/NavUserLayout";
import SidebarMenuComponent from "@/components/common/Sidebar/SidebarMenuComponent";
import SecondSidebar from "@/components/common/SecondSidebar/SecondSidebar";

const AppSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const [mails, setMails] = useState(data.mails);
  const [isOpen, setOpen] = useState(false);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuComponent
                    key={item.title}
                    item={item}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    setMails={setMails}
                    setOpen={setOpen}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
      <SecondSidebar mails={mails} activeItem={activeItem} />
    </Sidebar>
  );
};

export default AppSidebar;
