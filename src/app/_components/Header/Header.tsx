"use client";
import Link from "next/link";
import HeaderNav from "./HeaderNav";
import UserSection from "./UserSection";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";

const SidebarTriggerWrapper: React.FC = () => {
  const { open } = useSidebar();
  return open ? null : <SidebarTrigger />;
};

const Header: React.FC = () => {
  return (
    <header className="w-full gap-2 bg-background p-2">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          <SidebarTriggerWrapper />
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
            <span className="text-lg font-bold">Logo</span>
          </Link>
        </div>
        <HeaderNav />

        <div className="flex items-center space-x-4">
          <UserSection />
        </div>
      </div>
    </header>
  );
};

export default Header;
