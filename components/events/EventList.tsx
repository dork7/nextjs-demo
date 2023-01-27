import React from 'react';
import EventItem from './EventItem';
import classes from './event-list.module.css';

const EventList = (props: any) => {
  const { events } = props;
  return (
    <ul className={classes.list}>
      {events.map((event: any) => (
        <EventItem key={event.id} eventItem={event} />
      ))}
    </ul>
  );
};

export default EventList;
