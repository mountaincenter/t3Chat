import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export const triggerEvent = async (
  channel: string,
  event: string,
  data: unknown,
) => {
  try {
    await pusher.trigger(channel, event, data);
  } catch (error) {
    console.error(`[PusherService] - Error triggering event: ${event}`, error);
  }
};
