import { Link } from 'react-router-dom';

const SidebarLeft = () => {
  return (
    <div className="grow flex">
      <ul className="m-auto mt-10 mb-10 text-xl">
        <li className="mb-3 hover:text-red-400 duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="mb-3 hover:text-red-400 duration-300">
          <Link to="/explore">Explore Topics</Link>
        </li>
        <li className="mb-3 hover:text-red-400 duration-300">
          <Link to="/my-topics">My Topics</Link>
        </li>
        <li className="mb-3 hover:text-red-400 duration-300">
          <Link to="/my-answers">My Answers</Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
