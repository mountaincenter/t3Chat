"use client";

import * as React from "react";
import { ChevronsUpDown, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/app/_components/ModeToggle/ModeToggle";

import { useUserMutation } from "@/app/hooks/useUserMutation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const NavUser = () => {
  const { isMobile } = useSidebar();
  const { user } = useUserMutation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
            >
              {user && (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user?.image && user?.name && (
                      <AvatarImage src={user.image} alt={user.name} />
                    )}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-[150px] rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <VisuallyHidden>
              <DropdownMenuLabel>タイトル</DropdownMenuLabel>
            </VisuallyHidden>
            <DropdownMenuItem className="flex items-center gap-0 p-0 font-normal">
              <div className="flex items-center">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user?.image && user?.name && (
                      <AvatarImage src={user.image} alt={user.name} />
                    )}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    {user && (
                      <>
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-auto">
                  <ModeToggle />
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
