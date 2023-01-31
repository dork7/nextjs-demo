import EventItem from "@/components/events/EventItem";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById_API, getEventPaths } from "helpers/api-utils";

const EventDetail = (props: any) => {
  const {
    query: { eventId },
  } = useRouter();

  const event: any = props.event; // getEventById(eventId);

  console.log(event);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      {/* <EventItem eventItem={eventDetails} /> */}
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location ?? ""}
        image={event?.image}
        imageAlt={event?.title}
      />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context: any) {
  const eventId = context.params.eventId;
  const eventData = await getEventById_API(eventId);
  return {
    props: {
      event: eventData,
    },
  };
}

export async function getStaticPaths() {
  const eventPaths = await getEventPaths();
  console.log(`eventPaths+++++++++`, eventPaths);
  return {
    paths: eventPaths,
    fallback: true,
  };
}

export default EventDetail;
