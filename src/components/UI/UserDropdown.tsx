import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserDropdown: React.FC<{ onLogout: () => void }> = props => {
  const [photo, setPhoto] = useState<string | null | undefined>('');

  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  onAuthStateChanged(auth, user => {
    if (user) {
      setPhoto(auth.currentUser?.photoURL);
    } else {
      setPhoto(null);
    }
  });

  return (
    <div className="text-right relative">
      <Menu as="div">
        <div className="flex items-center">
          <Menu.Button className="flex py-2">
            {photo ? (
              <img
                src={`${photo}`}
                alt="User thumbnail"
                className="h-12 ml-5 text-slate-600 cursor-pointer rounded-[50%] hover:text-red-400 hover:scale-105 duration-300"
              />
            ) : (
              <i className="fa-regular fa-circle-user fa-3x ml-5 text-slate-600 cursor-pointer hover:text-red-400 hover:scale-105 duration-300"></i>
            )}
          </Menu.Button>
          <p className="ml-2">{userEmail}</p>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile"
                    className={`${
                      active ? 'bg-red-400 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-regular fa-circle-user"></i>
                    </div>
                    View Profile
                  </Link>
                )}
              </Menu.Item>
              {auth.currentUser?.providerData[0]?.providerId === 'password' && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile/change-password"
                      className={`${
                        active ? 'bg-red-400 text-white' : 'text-black'
                      } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                    >
                      <div className="flex">
                        <i className="fa-solid fa-gear"></i>
                      </div>
                      Change Password
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={props.onLogout}
                    className={`${
                      active ? 'bg-red-400 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
