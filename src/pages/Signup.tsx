const Signup = () => {
  return (
    <form className="ml-auto mr-auto mt-16 flex flex-col items-center border-2 border-red-400 rounded-md p-6">
      <h3 className="text-2xl">
        Create a <span className="text-red-400">Bulb Up!</span> account
      </h3>
      <div className="mt-5">
        <div className="flex flex-col mt-5">
          <label htmlFor="email">Please enter a valid email:</label>
          <input
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="email"
            id="email"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password">Please choose a password:</label>
          <input
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="password"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password">Please confirm your password:</label>
          <input
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="password"
          />
        </div>
      </div>
      <div className="mt-10">
        <a
          href="/"
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Cancel
        </a>
        <button className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300">
          Create an account
        </button>
      </div>
    </form>
  );
};

export default Signup;
