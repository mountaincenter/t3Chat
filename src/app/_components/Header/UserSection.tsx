import React from "react";
// import { ModeToggle } from "../ModeToggle/ModeToggle";
import LoginAvatar from "@/components/common/LoginAvatar";
import { useSession } from "next-auth/react";

const UserSection: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <LoginAvatar isHeader={true} session={session} />
    </div>
  );
};

export default UserSection;
