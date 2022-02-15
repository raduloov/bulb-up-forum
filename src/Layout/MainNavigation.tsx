import { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import UserDropdown from '../components/UI/Dropdown';
import { getAuth } from 'firebase/auth';

const MainNavigation: React.FC<{ isLoggedIn: boolean }> = props => {
  const navigate = useNavigate();

  const auth = getAuth();

  const logoutHandler = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <header className="p-2 flex justify-evenly items-center shadow-xl">
      <div className="flex">
        <img src={logo} alt="Logo" className="h-20" />
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl">Bulb Up!</h3>
          <p className="text-xl">Forum</p>
        </div>
      </div>
      <div className="relative text-md">
        <SearchIcon className="h-8 ml-2 text-red-400 absolute top-[50%] translate-y-[-50%]" />
        <input
          className="pt-3 pr-3 pb-3 pl-10 border-2 border-red-100 rounded-md outline-red-400 hover:bg-red-50 focus:bg-red-50"
          type="text"
          placeholder="Search for a topic..."
        />
      </div>
      {!props.isLoggedIn && (
        <div className="flex items-center">
          <Link
            to="/signup"
            className="m-1 p-2 text-white bg-red-400 border-2 border-red-400 rounded-md hover:bg-white hover:text-red-400 duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white duration-300"
          >
            Log In
          </Link>
        </div>
      )}
      {props.isLoggedIn && (
        <div className="flex items-center">
          <div>
            <UserDropdown onLogout={logoutHandler} />
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
