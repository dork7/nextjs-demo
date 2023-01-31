import React from "react";
import Button from "../ui/Button";
import classes from "./event-item.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right-icon";
import Image from "next/image";

const EventItem = (props: any) => {
  const { title, image, date, location, id } = props.eventItem;
  const goodDate = new Date(date).toLocaleDateString("en-US");
  const exploreLink = "/events/" + id;
  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt="img" width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{goodDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{location}</address>
          </div>
        </div>
        <div className={classes.action}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
