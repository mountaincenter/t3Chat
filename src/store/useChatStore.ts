import { create } from "zustand";
import type { UserWithDetails } from "@/app/types";

interface ChatStoreState {
  selectedUser: UserWithDetails | null;
  conversationId: string | null;
  setSelectedUser: (user: UserWithDetails | null) => void;
  setConversationId: (id: string | null) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  selectedUser: null,
  conversationId: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setConversationId: (id) => set({ conversationId: id }),
}));
