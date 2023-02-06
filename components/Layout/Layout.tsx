import NotificationContext from "@/store/notification-context";
import React, { useContext } from "react";
import Notification from "../notification/notification";
import MainHeader from "./MainHeader";

const Layout = (props: any) => {
  const notificationContext = useContext(NotificationContext);

  const { notification } = notificationContext;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification?.title}
          message={notification?.message}
          status={notification?.status}
        />
      )}
    </>
  );
};

export default Layout;
