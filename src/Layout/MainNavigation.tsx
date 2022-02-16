import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import logo from '../assets/logo.png';
import UserDropdown from '../components/UI/UserDropdown';

const MainNavigation: React.FC<{
  isLoggedIn: boolean;
  onSearch: (searchTerm: string) => void;
}> = props => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  const auth = getAuth();

  const logoutHandler = async () => {
    await signOut(auth);
    return navigate('/login');
  };

  const searchHandler = (event: FormEvent) => {
    event.preventDefault();

    navigate('/explore');
    setSearchTerm('');
    props.onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={searchHandler}
      className="p-2 flex justify-evenly items-center shadow-xl bg-white z-10 fixed w-full"
    >
      <div className="flex">
        <img src={logo} alt="Logo" className="h-20" />
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl">Bulb Up!</h3>
          <p className="text-xl">Forum</p>
        </div>
      </div>
      <div className="relative text-md">
        <i className="fa-solid fa-magnifying-glass ml-2 text-2xl text-red-400 absolute top-[50%] translate-y-[-50%]"></i>
        <input
          onChange={event => setSearchTerm(event.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search for a topic..."
          className="pt-3 pr-3 pb-3 pl-10 border-2 border-red-100 rounded-md outline-red-400 hover:bg-red-50 focus:bg-red-50"
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
    </form>
  );
};

export default MainNavigation;
