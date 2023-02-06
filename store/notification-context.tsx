import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData: any) {},
  hideNotification: function () {},
});

export type NotificationType = {
  title: string;
  message: string;
  status: string;
};

export function NotificationContextProvider(props: any) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationType | null>();
  useEffect(() => {
    if (activeNotification && activeNotification?.status !== "pending") {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: any) {
    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const context: any = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
