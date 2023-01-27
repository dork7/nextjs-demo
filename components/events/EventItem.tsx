import React from 'react';
import Button from '../ui/button';
import classes from './event-item.module.css';

const EventItem = (props: any) => {
  const { title, image, date, location, id } = props.eventItem;
  const goodDate = new Date(date).toLocaleDateString('en-US');
  const exploreLink = '/';
  return (
    <li className={classes.item}>
      <img src={'/' + image} alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{goodDate}</time>
          </div>
          <div className={classes.address}>
            <address>{location}</address>
          </div>
        </div>
        <div className={classes.action}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
