import React from 'react';
import MainNavigation from './MainNavigation';

const Layout: React.FC<{ isLoggedIn: boolean }> = props => {
  return (
    <>
      <MainNavigation isLoggedIn={props.isLoggedIn} />
      <main className="flex">{props.children}</main>
    </>
  );
};

export default Layout;
