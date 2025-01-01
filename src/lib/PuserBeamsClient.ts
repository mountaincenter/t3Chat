"use client"; // クライアント側で動作するコンポーネントには宣言が必要

import { useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default function PusherBeamsClient() {
  useEffect(() => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: process.env.NEXT_PUBLIC_BEAMS_INSTANCE_ID!,
    });

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest("hello"))
      .then(() => console.log("Successfully registered and subscribed!"))
      .catch(console.error);
  }, []);

  return null; // UIは何も表示しないので、nullを返します
}
