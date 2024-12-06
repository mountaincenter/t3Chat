"use client";

import React from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { LucideProps } from "lucide-react";

interface ItemProps {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
}

interface SidebarMenuComponentProps {
  item: ItemProps;
  activeItem: ItemProps | undefined; // 追加
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
  setMails,
  setOpen,
}) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        tooltip={{ children: item.title, hidden: false }}
        onClick={() => {
          setActiveItem(item);
          setMails((prev) => prev.slice(0, 5));
          setOpen(true);
        }}
        isActive={activeItem && activeItem.title === item.title}
        className="px-2.5 md:px-2"
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
