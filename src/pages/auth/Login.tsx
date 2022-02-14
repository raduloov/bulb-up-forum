import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

const Login = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const signInWithEmailAndPassword = () => {
    if (error !== '') {
      setError('');
    }

    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setAuthenticating(false);
        setError('Unable to sign in. Please try agin later.');
      });
  };

  return (
    <form className="ml-auto mr-auto mt-16 flex flex-col items-center border-2 border-red-400 rounded-md p-6">
      <h3 className="text-2xl">
        Log in to your <span className="text-red-400">Bulb Up!</span> account
      </h3>
      <div className="mt-5">
        <div className="flex flex-col mt-5">
          <label htmlFor="email">Email:</label>
          <input
            onChange={event => setEmail(event.target.value)}
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="email"
            id="email"
            value={email}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password">Password:</label>
          <input
            onChange={event => setPassword(event.target.value)}
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="password"
            value={password}
          />
        </div>
      </div>
      <div className="mt-10">
        <Link
          to="/signup"
          className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300"
        >
          Dont have an account?
        </Link>
        <button
          onClick={signInWithEmailAndPassword}
          disabled={authenticating}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default Login;
