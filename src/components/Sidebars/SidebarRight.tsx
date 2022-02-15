import { Link } from 'react-router-dom';

const SidebarRight = () => {
  return (
    <div className="grow flex mt-28">
      <div className="m-auto mt-10 mb-10">
        <Link
          to="/new-post"
          className="flex items-center text-xl text-red-400 border-2 border-red-400 rounded-md p-2 hover:bg-red-400 hover:text-white duration-300"
        >
          <i className="fa-solid fa-pencil mr-2"></i> Start a New Topic
        </Link>
      </div>
    </div>
  );
};

export default SidebarRight;
