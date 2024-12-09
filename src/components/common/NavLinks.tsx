"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface NavLinkItem {
  label: string;
  path: string;
}

interface NavLinksProps {
  items: NavLinkItem[];
}

const NavLinks: React.FC<NavLinksProps> = ({ items }) => {
  const pathname = usePathname();

  const linkClasses = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  };

  return (
    <>
      <div className="flex space-x-4">
        {items.map((item) => (
          <Link
            className={`${linkClasses(item.path)} text-sm font-medium underline-offset-4 hover:underline`}
            key={item.path}
            href={item.path}
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavLinks;
