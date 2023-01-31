import EventList from "@/components/events/EventList";
import { Inter } from "@next/font/google";
import { getAllEvents, getFeaturedEvents } from "../dummy-data";
import EventSearch from "@/components/events/EventSearch";
import { useRouter } from "next/router";
import {
  getFeaturedEvents_API,
  transformEventsData_FB,
} from "../helpers/api-utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const featuredEvents = props.data;
  const router = useRouter();

  const findEventHandler = (month: string, year: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={featuredEvents} />
    </>
  );
}

export async function getStaticProps(context: any) {
  const data = await getFeaturedEvents_API();
  return {
    props: {
      data,
    },
    revalidate: 1800,
  };
}
