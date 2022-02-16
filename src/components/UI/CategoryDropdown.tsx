import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const CategoryDropdown: React.FC<{
  onPickIdea: () => void;
  onPickQuestion: () => void;
}> = props => {
  return (
    <div className="text-right relative">
      <Menu as="div">
        <div className="flex items-center">
          <Menu.Button className="flex py-2">
            <div className="border-2 border-red-400 rounded-md p-1 text-red-400 hover:bg-red-400 hover:text-white duration-300">
              <p>
                I have <i className="fa-solid fa-chevron-down"></i>
              </p>
            </div>
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
          <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={props.onPickIdea}
                    className={`${
                      active ? 'bg-yellow-400 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-regular fa-lightbulb"></i>
                    </div>
                    an idea
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={props.onPickQuestion}
                    className={`${
                      active ? 'bg-emerald-500 text-white' : 'text-black'
                    } group flex justify-between rounded-md items-center w-full px-2 py-2 duration-300`}
                  >
                    <div className="flex">
                      <i className="fa-solid fa-question"></i>
                    </div>
                    a question
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

export default CategoryDropdown;
