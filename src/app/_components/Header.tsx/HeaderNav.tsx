import React from "react";
import NavLinks from "@/components/common/NavLinks";

const HeaderNav: React.FC = () => {
  const navItems = [
    { label: "Chat", path: "/chat" },
    { label: "UserChat", path: "/conversation/user" },
    { label: "Clock", path: "/clock" },
  ];

  return (
    <nav className="space-4-x hidden md:flex">
      <NavLinks items={navItems} />
    </nav>
  );
};

export default HeaderNav;
