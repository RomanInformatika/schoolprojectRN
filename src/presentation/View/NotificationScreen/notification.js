import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const LR = async (fullDate,title) => {
  await schedulePushNotification(fullDate, title);
}


export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    null
  );
}

export async function schedulePushNotification(
  trigger, title
) {

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      // title: className + " " + type,
      body: title,
      data: 'goes here',
      // body: slot,
      // sound: 'default',
    },
    trigger,
  });
  return id;
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      // sound: true,
      lightColor: "#FF231F7C",
      // lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      // bypassDnd: true,
    });
  }

  return token;
}

// export async function cancelNotification(notifId){
//   await Notifications.cancelScheduledNotificationAsync(notifId);
// }