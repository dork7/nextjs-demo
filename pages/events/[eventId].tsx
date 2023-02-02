import EventItem from "@/components/events/EventItem";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById_API, getEventPaths } from "helpers/api-utils";
import Head from "next/head";

const EventDetail = (props: any) => {
  const {
    query: { eventId },
  } = useRouter();

  const { title } = props;

  const event: any = props.event; // getEventById(eventId);

  console.log(event);

  if (!event) {
    return (
      <div className="center">
        <p>Loading ....!</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {title} - {event?.title}
        </title>
        <meta name="description" content={event?.description} />
      </Head>
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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const eventPaths = await getEventPaths();
  return {
    paths: eventPaths,
    fallback: true,
  };
}

export default EventDetail;
