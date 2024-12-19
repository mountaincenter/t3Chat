export interface Message {
  id: string;
  content: string;
  imageUrl?: string | string[] | null;
  senderId: string;
  timestamp: string;
}

export const getRealtimeMessages = (
  userId: string,
  selectedUserId: string,
): Message[] => [
  {
    id: "1",
    content: "こちらの写真をご覧ください！",
    imageUrl: [
      "https://picsum.photos/150",
      "https://picsum.photos/200",
      "https://picsum.photos/180",
      "https://picsum.photos/160",
    ],
    senderId: selectedUserId,
    timestamp: "2023-01-05T12:45:57.433666",
  },
  {
    id: "2",
    content:
      "今日はとても忙しかったです。朝からたくさんの会議があり、仕事が山積みでした。少し休憩をとりたいですね。",
    imageUrl: "https://picsum.photos/150",
    senderId: selectedUserId,
    timestamp: "2023-01-16T05:41:00.433666",
  },
  {
    id: "3",
    content: "",
    imageUrl: "https://picsum.photos/230",
    senderId: selectedUserId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
  {
    id: "4",
    content: "すみません！",
    imageUrl: null,
    senderId: selectedUserId,
    timestamp: "2023-05-13T18:54:50.433666",
  },
  {
    id: "5",
    content: "よろしくお願いします。",
    imageUrl: null,
    senderId: selectedUserId,
    timestamp: "2023-06-01T04:58:54.433666",
  },
  {
    id: "6",
    content: "こちらの写真をご覧ください！",
    imageUrl: ["https://picsum.photos/210", "https://picsum.photos/220"],
    senderId: userId,
    timestamp: "2023-07-11T11:37:23.433666",
  },
  {
    id: "7",
    content:
      "新しいプロジェクトが始まりました。チーム全員が一生懸命取り組んでいるので、良い結果が期待できそうです。",
    imageUrl: "https://picsum.photos/170",
    senderId: userId,
    timestamp: "2023-08-04T08:42:10.433666",
  },
  {
    id: "8",
    content: "お元気ですか？",
    imageUrl: null,
    senderId: userId,
    timestamp: "2023-09-18T02:23:45.433666",
  },
  {
    id: "9",
    content: "こちらの写真をご覧ください！",
    imageUrl: "https://picsum.photos/180",
    senderId: selectedUserId,
    timestamp: "2023-10-01T13:15:32.433666",
  },
  {
    id: "10",
    content: "ありがとう！",
    imageUrl: null,
    senderId: selectedUserId,
    timestamp: "2023-10-20T10:05:55.433666",
  },
  {
    id: "11",
    content: "こちらの写真も見てください！",
    imageUrl: ["https://picsum.photos/150", "https://picsum.photos/210"],
    senderId: userId,
    timestamp: "2023-11-15T12:30:22.433666",
  },
  {
    id: "12",
    content: "いくつかの画像を送ります！",
    imageUrl: ["https://picsum.photos/160", "https://picsum.photos/220"],
    senderId: userId,
    timestamp: "2023-12-01T14:12:47.433666",
  },
  {
    id: "13",
    content: "素敵な景色ですね！",
    imageUrl: "https://picsum.photos/200",
    senderId: selectedUserId,
    timestamp: "2023-12-22T18:47:05.433666",
  },
  {
    id: "14",
    content: "良い一日を過ごせました！",
    imageUrl: null,
    senderId: userId,
    timestamp: "2024-01-02T09:20:33.433666",
  },
  {
    id: "15",
    content: "また連絡しますね。",
    imageUrl: null,
    senderId: selectedUserId,
    timestamp: "2024-01-15T20:15:44.433666",
  },
  {
    id: "16",
    content: "長方形の画像をご覧ください！",
    imageUrl: "https://picsum.photos/120/180", // 縦長
    senderId: selectedUserId,
    timestamp: "2023-01-05T12:45:57.433666",
  },
  {
    id: "17",
    content: "こちらの横長の画像も見てください。",
    imageUrl: "https://picsum.photos/200/120", // 横長
    senderId: userId,
    timestamp: "2023-01-16T05:41:00.433666",
  },
  {
    id: "18",
    content: "いろいろなサイズの画像を試しましょう！",
    imageUrl: [
      "https://picsum.photos/150/150", // 正方形
      "https://picsum.photos/200/120", // 横長
      "https://picsum.photos/180/240", // 縦長
    ],
    senderId: userId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
  {
    id: "19",
    content: "いろいろなサイズの画像を試しましょう！",
    imageUrl: [
      "https://picsum.photos/400/400", // 正方形
      "https://picsum.photos/400/120", // 横長
      "https://picsum.photos/180/400", // 縦長
    ],
    senderId: userId,
    timestamp: "2023-03-25T15:27:44.433666",
  },
];
