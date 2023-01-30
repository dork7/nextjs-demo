import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Button from '../ui/Button';
import styles from './events-search.module.css';

const EventSearch = (props: any) => {
  const router = useRouter();
  const year: any = useRef('');
  const month: any = useRef('');

  const filterClicked = (e: any) => {};
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log('year', year.current.value);
    console.log('month :>> ', month.current.value);
    const selectedYear = year.current.value;
    const selectedMonth = month.current.value;

    props.onSearch(selectedMonth, selectedYear);
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="year">year</label>
            <select ref={year} name="year" id="year">
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className={styles.month}>
            <label htmlFor="month">
              <select name="month" id="month" ref={month}>
                <option value="1">january</option>
                <option value="2">feb</option>
                <option value="3">march</option>
                <option value="4">april</option>
                <option value="5">may</option>
                <option value="6">june</option>
                <option value="7">july</option>
                <option value="8">aug</option>
                <option value="9">sept</option>
                <option value="10">oct</option>
                <option value="11">nov</option>
                <option value="12">dec</option>
              </select>
            </label>
          </div>
        </div>
        <Button onClick={filterClicked}>Find Event</Button>
      </form>
    </>
  );
};

export default EventSearch;
