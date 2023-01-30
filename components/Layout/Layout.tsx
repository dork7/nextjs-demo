import React from 'react';
import MainHeader from './MainHeader';

const Layout = (props: any) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
