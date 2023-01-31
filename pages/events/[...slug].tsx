import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const FilteredEvents = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p>loading....</p>;
  }

  const filterYear = parseInt(filterData[0]);
  const filterMonth = parseInt(filterData[1]);

  if (isNaN(filterMonth) || isNaN(filterYear)) {
    return <p>Filter not valid</p>;
  }

  const filteredEvents = getFilteredEvents({
    month: filterMonth,
    year: filterYear,
  });

  const PageHead = () => {
    return (
      <Head>
        <title> Filtered events</title>
        <meta name="description" content="Page of filtered events" />
      </Head>
    );
  };
  // console.log('filterMonth', filterMonth);
  // console.log('filterYear', filterYear);
  // console.log('filteredEvents :>> ', filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <PageHead />
        <ErrorAlert>
          <p>No event.....</p>
          <div className="center">
            <Button link="/events">Show All events</Button>
          </div>
        </ErrorAlert>
      </>
    );
  }

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
