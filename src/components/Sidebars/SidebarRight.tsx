import { PencilIcon } from '@heroicons/react/outline';

const SidebarRight = () => {
  return (
    <div className="grow flex">
      <div className="m-auto mt-10 mb-10">
        <button className="flex items-center text-xl text-red-400 border-2 border-red-400 rounded-md p-2 hover:bg-red-400 hover:text-white duration-300">
          <PencilIcon className="h-5 mr-2" /> Start a New Topic
        </button>
      </div>
    </div>
  );
};

export default SidebarRight;
