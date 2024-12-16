"use client";
import { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SendHorizontal, Paperclip } from "lucide-react";
import Image from "next/image";
import { useMessageMutation } from "@/app/hooks/useMessageMutation";
import type { Message } from "@prisma/client";
import type { UserWithDetails } from "@/app/types";
import { useChatStore } from "@/store/useChatStore";

interface ConversationAreaProps {
  conversationId: string;
  user: UserWithDetails;
}

const ConversationArea: React.FC<ConversationAreaProps> = ({
  conversationId,
  user,
}) => {
  const { selectedUser } = useChatStore();
  const { messages, createMessage, isMessagesLoading } =
    useMessageMutation(conversationId);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [realtimeMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" || selectedFile) {
      const senderId = user.id; // 修正: user.idを直接使用
      await createMessage({
        content: newMessage.trim() !== "" ? newMessage : "",
        senderId,
        file: selectedFile,
      });
      setNewMessage("");
      setSelectedFile(undefined);
      setFilePreview(undefined);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">
          {selectedUser?.name} {/* グループ名またはユーザー名を表示 */}
        </h2>
      </div>

      {isMessagesLoading ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <p>Loading...</p>
        </div>
      ) : (
        <ScrollArea
          className="flex-1 overflow-y-auto p-4"
          ref={scrollAreaRef}
          style={{ minHeight: "calc(100vh - 150px)" }}
        >
          {realtimeMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.senderId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block max-w-[70%] rounded-lg p-3 ${
                  message.senderId === user.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black dark:bg-gray-300 dark:text-black"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}

      <div className="fixed bottom-0 right-0 w-full border-t bg-white p-4 dark:bg-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <label htmlFor="file-upload">
                  <Paperclip className="cursor-pointer" />
                </label>
              </TooltipTrigger>
              <TooltipContent>ファイルを添付</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            onClick={(e) => (e.currentTarget.value = "")}
          />

          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
          {filePreview && (
            <div className="mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={filePreview}
                    alt="Selected Preview"
                    width={100}
                    height={100}
                    className="cursor-pointer rounded"
                  />
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-[90vw] p-4">
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={filePreview}
                      alt="Preview enlarged"
                      layout="intrinsic"
                      width={600}
                      height={600}
                      className="rounded"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConversationArea;
