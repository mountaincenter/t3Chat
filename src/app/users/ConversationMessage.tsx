import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserWithDetails } from "../types";
import { ThumbnailCarousel } from "./ThumbnailCarousel";
import { MainCarousel } from "./MainCarousel";
import type { File } from "@prisma/client";

interface ConversationMessageProps {
  content: string;
  senderId: string;
  selectedUser: UserWithDetails;
  files?: File[]; // 修正：imageUrl の代わりに files
  timestamp: Date;
  isOwnMessage: boolean;
  isRead?: boolean;
}

const ConversationMessage = ({
  content,
  selectedUser,
  files,
  timestamp,
  isOwnMessage,
  isRead = true,
}: ConversationMessageProps) => {
  const resolvedImages = files?.map((file) => file.url) || []; // ファイルのURLを抽出

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <div
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
          {content && <p className="m-0 mt-1">{content}</p>}
        </div>

        {/* Time and Read Indicator */}
        <div className="flex flex-col items-end">
          {isOwnMessage && isRead && (
            <span className="mb-1 text-xs text-gray-400">既読</span>
          )}
          <span className="text-xs text-gray-400">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessage;
