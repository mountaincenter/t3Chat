import React from "react";
// import { ModeToggle } from "../ModeToggle/ModeToggle";
import LoginAvatar from "@/components/common/LoginAvatar";

const UserSection: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <LoginAvatar />
    </div>
  );
};

export default UserSection;
