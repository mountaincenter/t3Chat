"use client";

import React from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import type { LucideProps } from "lucide-react";
import { signIn } from "next-auth/react";
import { useUserMutation } from "@/app/hooks/useUserMutation";

interface ItemProps {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  requiresLogin: boolean; // ログイン必要フラグ
}

interface SidebarMenuComponentProps {
  item: ItemProps;
  activeItem: ItemProps | undefined;
  setActiveItem: (item: ItemProps | undefined) => void;
  setMails: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        email: string;
        subject: string;
        date: string;
        teaser: string;
      }[]
    >
  >;
  setOpen: (open: boolean) => void;
}

const SidebarMenuComponent: React.FC<SidebarMenuComponentProps> = ({
  item,
  activeItem,
  setActiveItem,
  setOpen,
}) => {
  const { user } = useUserMutation();

  const handleClick = () => {
    if (!user && item.requiresLogin) {
      // ログインが必要な場合の処理
      alert("この機能を利用するにはログインが必要です。");
      void signIn();
    } else {
      setActiveItem(item);
      setOpen(true);
    }
  };

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        tooltip={{ children: item.title, hidden: false }}
        onClick={handleClick}
        isActive={activeItem && activeItem.title === item.title}
        className={`px-2.5 md:px-2 ${
          !user && item.requiresLogin ? "cursor-not-allowed opacity-50" : ""
        }`}
        asChild
      >
        <Link href={item.url} className="flex items-center gap-2">
          <item.icon className="h-6 w-6" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarMenuComponent;
