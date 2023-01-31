import EventList from "@/components/events/EventList";
import { getAllEvents, getFeaturedEvents } from "../../dummy-data";
import EventSearch from "@/components/events/EventSearch";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";

import {
  getAllEvents_API,
  transformEventsData_FB,
} from "../../helpers/api-utils";

const AllEvents = (props: any) => {
  // let featuredEvents = getAllEvents();

  const [featuredEvents, setFeaturedEvents] = useState(props.data);
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    "https://nextjs-demo-9a278-default-rtdb.firebaseio.com/events.json",
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setFeaturedEvents(transformEventsData_FB(data));
    }
  }, [data]);

  const findEventHandler = (month: string, year: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  if (!featuredEvents && !data) return "loading...";
  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={featuredEvents} />
    </>
  );
};

export async function getStaticProps(context: any) {
  const data = await getAllEvents_API();

  return {
    props: {
      data,
    },
    // revalidate: 10,
  };
}

export default AllEvents;
