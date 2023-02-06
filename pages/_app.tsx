import Layout from "@/components/Layout/Layout";
import Notification from "@/components/notification/notification";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { NotificationContextProvider } from "../store/notification-context";

export default function App({ Component, pageProps }: AppProps) {
  const title = "Event App";

  return (
    <>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>{title}</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} title={title} />
        </Layout>
      </NotificationContextProvider>
    </>
  );
}
