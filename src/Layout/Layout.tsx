import React from 'react';
import MainNavigation from './MainNavigation';

const Layout: React.FC<{
  isLoggedIn: boolean;
  onSearch: (searchTerm: string) => void;
}> = props => {
  return (
    <>
      <MainNavigation isLoggedIn={props.isLoggedIn} onSearch={props.onSearch} />
      <main className="flex">{props.children}</main>
    </>
  );
};

export default Layout;
