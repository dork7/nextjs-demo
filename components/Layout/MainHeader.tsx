import Link from 'next/link';
import React from 'react';
import styles from './main-header.module.css';

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="events">Browser all events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
