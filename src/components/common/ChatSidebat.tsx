import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserSection from "@/app/_components/Header/UserSection";
import UserList from "@/app/_components/Lists/UserList";
import type { Session } from "next-auth";
import type { UserWithDetails } from "@/app/types";

interface ChatSidebarProps {
  users: UserWithDetails[];
  onSelectUser: (conversatonId: string, user: UserWithDetails) => void;
  session: Session | null;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  onSelectUser,
  session,
}) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <UserList users={users} onSelectUser={onSelectUser} session={session} />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserSection />
      </SidebarFooter>
    </Sidebar>
  );
};
