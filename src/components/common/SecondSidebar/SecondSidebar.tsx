import React from "react";

import { usePathname } from "next/navigation";

import type { LucideProps } from "lucide-react";
import RootSecondSidebar from "./RootSecondSidebar";
import UsersSecondSidebar from "./UsersSecondSidebar";
import ChatSecondSidebar from "./ChatSecondSidebar";
import FilesSecondSidebar from "./FilesSecondSidebar";

interface Item {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
}

interface SecondSidebarProps {
  activeItem: Item | undefined;
}

const SecondSidebar: React.FC<SecondSidebarProps> = ({ activeItem }) => {
  const sidebarComponents: Record<string, React.FC> = {
    "/": () => <RootSecondSidebar activeItem={activeItem} />,
    "/users": () => <UsersSecondSidebar pathname={pathname} />,
    "/chat": () => <ChatSecondSidebar pathname={pathname} />,
    "/files": () => <FilesSecondSidebar pathname={pathname} />,
  };

  const pathname = usePathname();
  const ActiveComponent =
    sidebarComponents[pathname] ?? (() => <div>No data</div>);

  return <ActiveComponent />;
};

export default SecondSidebar;
