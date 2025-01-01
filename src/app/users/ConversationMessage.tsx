"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatStore } from "@/store/useChatStore";
import { useMessageMutation } from "@/app/hooks/useMessageMutation";
import { ThumbnailCarousel } from "./ThumbnailCarousel";
import { MainCarousel } from "./MainCarousel";
import { useUserMutation } from "../hooks/useUserMutation";
import type { MessageWithFilesAndSender } from "../types";

interface ConversationMessageProps {
  message: MessageWithFilesAndSender;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({
  message,
}) => {
  const { user } = useUserMutation();
  const { selectedUser, conversationId } = useChatStore();
  const { messages } = useMessageMutation(conversationId);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  console.log("messages", messages);
  if (!selectedUser || !messages) {
    return <p>No conversation selected or no messages available.</p>;
  }

  if (!user) {
    return <p>Loading user information...</p>;
  }

  const resolvedImages = message.files?.map((file) => file.url) || [];
  const isOwnMessage = message.senderId === user.id;
  return (
    <div>
      <div
        key={message.id}
        className={`mb-4 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
      >
        {!isOwnMessage && (
          <Avatar className="mr-2 h-10 w-10 shrink-0">
            {selectedUser.image && selectedUser.name ? (
              <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
            ) : (
              <AvatarFallback>
                {selectedUser.name?.slice(0, 2).toUpperCase() ?? "??"}
              </AvatarFallback>
            )}
          </Avatar>
        )}

        <div
          className={`flex items-end gap-2 ${
            isOwnMessage ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`rounded-lg p-3 ${
              isOwnMessage
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-100"
            } max-w-xs overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {/* Thumbnail and Dialog */}
            {resolvedImages.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="grid cursor-pointer grid-cols-2 gap-2">
                    {resolvedImages.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-lg"
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                        }}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <Image
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          width={150}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogTitle>
                    <span className="sr-only">Image Preview</span>
                  </DialogTitle>
                  <MainCarousel
                    images={resolvedImages}
                    selectedIndex={selectedImageIndex}
                    setSelectedIndex={setSelectedImageIndex}
                  />
                  <ThumbnailCarousel
                    images={resolvedImages}
                    selectedIndex={selectedImageIndex}
                    setSelectedIndex={setSelectedImageIndex}
                  />
                </DialogContent>
              </Dialog>
            )}

            {/* Text Content */}
            {message.content && <p className="m-0 mt-1">{message.content}</p>}
          </div>

          {/* Time and Read Indicator */}
          <div className="flex flex-col items-end">
            {isOwnMessage && message.readBy && (
              <span className="mb-1 text-xs text-gray-400">既読</span>
            )}
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessage;
