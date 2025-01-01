import React from "react";

import { usePathname } from "next/navigation";

import { LucideProps } from "lucide-react";
import RootSecondSidebar from "./RootSecondSidebar";
import UsersSecondSidebar from "./UsersSecondSidebar";
import ChatSecondSidebar from "./ChatSecondSidebar";
import FilesSecondSidebar from "./FilesSecondSidebar";

interface Mail {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}

interface Item {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
}

interface SecondSidebarProps {
  mails: Mail[];
  activeItem: Item | undefined;
}

const SecondSidebar: React.FC<SecondSidebarProps> = ({ mails, activeItem }) => {
  const sidebarComponents: Record<string, React.FC> = {
    "/": () => <RootSecondSidebar mails={mails} activeItem={activeItem} />,
    "/users": () => <UsersSecondSidebar pathname={pathname} />,
    "/chat": () => <ChatSecondSidebar pathname={pathname} />,
    "/files": () => <FilesSecondSidebar pathname={pathname} />,
  };

  const pathname = usePathname();
  const ActiveComponent =
    sidebarComponents[pathname] || (() => <div>No data</div>);

  return <ActiveComponent />;
};

export default SecondSidebar;
