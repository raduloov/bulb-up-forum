import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { CurrencyDollarIcon, ArrowNarrowUpIcon } from '@heroicons/react/outline';

const UserDropdown: React.FC = props => {
  return (
    <div className="w-56 text-right relative">
      <Menu as="div" className="absolute inline-block text-left right-10">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-40 hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Sort by
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
                  <button
                    // onClick={() => props.sortBy('price-asc')}
                    className={`${
                      active ? 'bg-black bg-opacity-70 text-white' : 'text-gray-900'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <div className="flex">
                      <CurrencyDollarIcon className="h-5" />
                      <ArrowNarrowUpIcon className="h-5" />
                    </div>
                    Price (Ascending)
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
