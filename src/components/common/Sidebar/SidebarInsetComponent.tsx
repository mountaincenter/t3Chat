"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SidebarInsetComponentProps {
  children: React.ReactNode;
}

const SidebarInsetComponent: React.FC<SidebarInsetComponentProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { label: string; href: string }[]
  >([]);

  useEffect(() => {
    const items = pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, arr) => ({
        label: segment,
        href: `/${arr.slice(0, index + 1).join("/")}`,
      }));
    setBreadcrumbItems(items);
  }, [pathname]);

  return (
    <SidebarInset>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {children}
    </SidebarInset>
  );
};

export default SidebarInsetComponent;
