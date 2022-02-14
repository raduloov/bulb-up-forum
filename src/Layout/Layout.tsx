import React from 'react';
import MainNavigation from './MainNavigation';

const Layout: React.FC = props => {
  return (
    <>
      <MainNavigation />
      <main className="flex">{props.children}</main>
    </>
  );
};

export default Layout;
