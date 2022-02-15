import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserCircleIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC<{ onLogout: () => void }> = props => {
  return (
    <div className="w-56 text-right relative">
      <Menu as="div">
        <div>
          <Menu.Button className="flex py-2">
            <UserCircleIcon className="h-12 ml-5 text-slate-600 cursor-pointer hover:text-red-400 hover:scale-105 duration-300" />
          </Menu.Button>
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
                      <UserCircleIcon className="h-6" />
                    </div>
                    View Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/profile/change-password"
                    className={`${
                      active ? 'bg-red-400 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <CogIcon className="h-6" />
                    </div>
                    Change Password
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={props.onLogout}
                    className={`${
                      active ? 'bg-red-400 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <LogoutIcon className="h-6" />
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
