import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/Errors';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

const Login: React.FC<{ isLoggedIn: boolean }> = props => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn) {
      return navigate('/');
    }
  }, [props.isLoggedIn, navigate]);

  const loginHandler = async () => {
    if (error !== '') {
      setError('');
    }
    console.log(authenticating);

    setAuthenticating(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      setAuthenticating(false);

      if (error.code.includes('auth/invalid-email')) {
        setError('Invalid email.');
      } else if (error.code.includes('auth/wrong-password')) {
        setError('Password for this user is invalid.');
      } else {
        setError('Unable to login. Please try again later.');
      }
    }
    console.log(authenticating);
  };

  const loginWithGoogleHandler = async () => {
    if (error !== '') {
      setError('');
    }

    setAuthenticating(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch (error: any) {
      setAuthenticating(false);
      setError(error.message);
    }
  };

  return (
    <form className="ml-auto mr-auto mt-16 flex flex-col items-center border-2 border-red-400 rounded-md p-6">
      <h3 className="text-2xl">
        Log in to your <span className="text-red-400">Bulb Up!</span> account
      </h3>
      {authenticating && <LoadingSpinner />}
      {!authenticating && (
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
          <div className="flex flex-col mt-5 mb-5">
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
      )}
      <ErrorText error={error} />
      <div className="mt-2 flex flex-col">
        <button
          onClick={loginHandler}
          disabled={authenticating}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Log In
        </button>
        <Link
          to="/signup"
          className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300"
        >
          Dont have an account?
        </Link>
        <hr className="m-3 border-slate-400" />
        <button
          onClick={loginWithGoogleHandler}
          disabled={authenticating}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Log In With Google
        </button>
      </div>
    </form>
  );
};

export default Login;
