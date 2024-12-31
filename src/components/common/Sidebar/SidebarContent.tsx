"use client";

import React from "react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";
import { signIn } from "next-auth/react";
import { useUserMutation } from "@/app/hooks/useUserMutation";

import { data } from "./data";

const SidebarContentComponent = () => {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();
  const { user } = useUserMutation();

  return (
    <>
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{ children: item.title, hidden: false }}
                    onClick={() => {
                      if (!user && item.requiresLogin) {
                        // ログインが必要な場合の処理
                        alert("この機能を利用するにはログインが必要です。");
                        void signIn();
                      } else {
                        setActiveItem(item);
                        setOpen(true);
                      }
                    }}
                    isActive={activeItem && activeItem.title === item.title}
                    className={`px-2.5 md:px-2 ${
                      !user && item.requiresLogin
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};

export default SidebarContentComponent;
