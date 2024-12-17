import PushNotifications from "@pusher/push-notifications-server";

export const beamsClient = new PushNotifications({
  instanceId: process.env.BEAMS_INSTANCE_ID!,
  secretKey: process.env.BEAMS_SECRET_KEY!,
});
