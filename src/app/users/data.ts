import type { File, Conversation } from "@prisma/client";

export interface Message {
  id: string;
  content: string;
  files?: File[];
  senderId: string;
  timestamp: string;
}

type SampleConvesation = Omit<
  Conversation,
  "name" | "isGroup" | "groupId" | "createdAt" | "updatedAt"
>;
// メッセージIDに基づいて関連するファイルを取得
const fileCache: Record<string, File[]> = {};

// キャッシュを活用したファイル取得関数
const getFilesForMessage = (messageId: string): File[] => {
  if (!messageId) {
    throw new Error("messageId is required");
  }

  // キャッシュに存在すればそれを返す
  if (fileCache[messageId]) {
    return fileCache[messageId];
  }

  // フィルタリングしてキャッシュに保存
  const files = getFiles.filter((file) => file.messageId === messageId);
  fileCache[messageId] = files;

  if (files.length === 0) {
    console.warn(`No files found for messageId: ${messageId}`);
  }

  return files;
};

export const getRealtimeMessages = (
  userId: string,
  selectedUserId: string,
): Message[] => [
  {
    id: "1",
    content: "こちらの写真をご覧ください！",
    files: getFilesForMessage("1"), // ファイルを取得
    senderId: selectedUserId,
    timestamp: "2023-01-05T12:45:57.433666",
  },
  {
    id: "2",
    content:
      "今日はとても忙しかったです。朝からたくさんの会議があり、仕事が山積みでした。少し休憩をとりたいですね。",
    files: getFilesForMessage("2"),
    senderId: selectedUserId,
    timestamp: "2023-01-16T05:41:00.433666",
  },
  {
    id: "3",
    content: "",
    files: getFilesForMessage("3"),
    senderId: selectedUserId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
  {
    id: "4",
    content: "すみません！",
    files: [], // ファイルがない場合は空配列
    senderId: selectedUserId,
    timestamp: "2023-05-13T18:54:50.433666",
  },
  {
    id: "5",
    content: "よろしくお願いします。",
    files: [], // ファイルがない場合
    senderId: selectedUserId,
    timestamp: "2023-06-01T04:58:54.433666",
  },
  {
    id: "6",
    content: "こちらの写真をご覧ください！",
    files: getFilesForMessage("6"),
    senderId: userId,
    timestamp: "2023-07-11T11:37:23.433666",
  },
  {
    id: "7",
    content:
      "新しいプロジェクトが始まりました。チーム全員が一生懸命取り組んでいるので、良い結果が期待できそうです。",
    files: getFilesForMessage("7"),
    senderId: userId,
    timestamp: "2023-08-04T08:42:10.433666",
  },
  {
    id: "8",
    content: "お元気ですか？",
    files: [],
    senderId: userId,
    timestamp: "2023-09-18T02:23:45.433666",
  },
  {
    id: "9",
    content: "こちらの写真をご覧ください！",
    files: getFilesForMessage("9"),
    senderId: selectedUserId,
    timestamp: "2023-10-01T13:15:32.433666",
  },
  {
    id: "10",
    content: "ありがとう！",
    files: [],
    senderId: selectedUserId,
    timestamp: "2023-10-20T10:05:55.433666",
  },
  {
    id: "11",
    content: "こちらの写真も見てください！",
    files: getFilesForMessage("11"),
    senderId: userId,
    timestamp: "2023-11-15T12:30:22.433666",
  },
  {
    id: "12",
    content: "いくつかの画像を送ります！",
    files: getFilesForMessage("12"),
    senderId: userId,
    timestamp: "2023-12-01T14:12:47.433666",
  },
  {
    id: "13",
    content: "素敵な景色ですね！",
    files: getFilesForMessage("13"),
    senderId: selectedUserId,
    timestamp: "2023-12-22T18:47:05.433666",
  },
  {
    id: "14",
    content: "良い一日を過ごせました！",
    files: [],
    senderId: userId,
    timestamp: "2024-01-02T09:20:33.433666",
  },
  {
    id: "15",
    content: "また連絡しますね。",
    files: [],
    senderId: selectedUserId,
    timestamp: "2024-01-15T20:15:44.433666",
  },
  {
    id: "16",
    content: "長方形の画像をご覧ください！",
    files: getFilesForMessage("16"),
    senderId: selectedUserId,
    timestamp: "2023-01-05T12:45:57.433666",
  },
  {
    id: "17",
    content: "こちらの横長の画像も見てください。",
    files: getFilesForMessage("17"),
    senderId: userId,
    timestamp: "2023-01-16T05:41:00.433666",
  },
  {
    id: "18",
    content: "いろいろなサイズの画像を試しましょう！",
    files: getFilesForMessage("18"),
    senderId: userId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
  {
    id: "19",
    content: "いろいろなサイズの画像を試しましょう！",
    files: getFilesForMessage("19"),
    senderId: userId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
];

export const getConversation = (
  userId: string,
  selectedUserId: string,
): Conversation & { participants: string[]; messages: Message[] } => {
  const messages = getRealtimeMessages(userId, selectedUserId);
  return {
    id: "conversation-1",
    participants: [userId, selectedUserId], // 自分と選択したユーザーを参加者として設定
    messages: messages, // 取得したメッセージを会話に追加
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-01T00:00:00Z"),
    name: null,
    isGroup: false,
    groupId: null,
  };
};

const getFiles: File[] = [
  {
    id: "1",
    url: "https://picsum.photos/150",
    fileType: "IMAGE",
    messageId: "1",
  },
  {
    id: "2",
    url: "https://picsum.photos/200",
    fileType: "IMAGE",
    messageId: "1",
  },
  {
    id: "3",
    url: "https://picsum.photos/160",
    fileType: "IMAGE",
    messageId: "1",
  },
  {
    id: "4",
    url: "https://picsum.photos/180",
    fileType: "IMAGE",
    messageId: "1",
  },
  {
    id: "5",
    url: "https://picsum.photos/150",
    fileType: "IMAGE",
    messageId: "2",
  },
  {
    id: "6",
    url: "https://picsum.photos/230",
    fileType: "IMAGE",
    messageId: "3",
  },
  {
    id: "8",
    url: "https://picsum.photos/210",
    fileType: "IMAGE",
    messageId: "6",
  },
  {
    id: "9",
    url: "https://picsum.photos/220",
    fileType: "IMAGE",
    messageId: "6",
  },
  {
    id: "10",
    url: "https://picsum.photos/170",
    fileType: "IMAGE",
    messageId: "7",
  },
  {
    id: "11",
    url: "https://picsum.photos/180",
    fileType: "IMAGE",
    messageId: "9",
  },
  {
    id: "12",
    url: "https://picsum.photos/150",
    fileType: "IMAGE",
    messageId: "11",
  },
  {
    id: "13",
    url: "https://picsum.photos/210",
    fileType: "IMAGE",
    messageId: "11",
  },
  {
    id: "14",
    url: "https://picsum.photos/160",
    fileType: "IMAGE",
    messageId: "12",
  },
  {
    id: "15",
    url: "https://picsum.photos/220",
    fileType: "IMAGE",
    messageId: "12",
  },
  {
    id: "16",
    url: "https://picsum.photos/200",
    fileType: "IMAGE",
    messageId: "13",
  },
  {
    id: "17",
    url: "https://picsum.photos/120/180",
    fileType: "IMAGE",
    messageId: "16",
  },
  {
    id: "18",
    url: "https://picsum.photos/200/120",
    fileType: "IMAGE",
    messageId: "17",
  },
  {
    id: "19",
    url: "https://picsum.photos/150/150",
    fileType: "IMAGE",
    messageId: "18",
  },
  {
    id: "20",
    url: "https://picsum.photos/200/120",
    fileType: "IMAGE",
    messageId: "18",
  },
  {
    id: "21",
    url: "https://picsum.photos/180/240",
    fileType: "IMAGE",
    messageId: "18",
  },
  {
    id: "22",
    url: "https://picsum.photos/400/400",
    fileType: "IMAGE",
    messageId: "19",
  },
  {
    id: "23",
    url: "https://picsum.photos/400/240",
    fileType: "IMAGE",
    messageId: "19",
  },
  {
    id: "24",
    url: "https://picsum.photos/180/400",
    fileType: "IMAGE",
    messageId: "19",
  },
];
