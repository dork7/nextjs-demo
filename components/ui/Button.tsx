import Link from 'next/link';
import React from 'react';
import styles from './button.module.css';
const Button = (props: any) => {
  return (
    <Link href={props.link} className={styles.btn}>
      {props.children}
    </Link>
  );
};

export default Button;
