import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';

const Signup = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError('Please make sure your passwords match.');
    }

    if (error !== '') {
      setError('');
    }

    setRegistering(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);

        if (err.code.includes('auth/weak-password')) {
          setError('Please enter a stronger password.');
        } else if (err.code.includes('auth/email-already-in-use')) {
          setError('Email is already in use.');
        } else {
          setError('Unable to register. Please try again later.');
        }

        setRegistering(false);
      });
  };

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
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password">Please choose a password:</label>
          <input
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="confirm-password">Please confirm your password:</label>
          <input
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="confirm-password"
            onChange={event => setConfirm(event.target.value)}
            value={confirm}
          />
        </div>
      </div>
      <div className="mt-10">
        <Link
          to="/login"
          className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:text-white hover:bg-red-400 transition-all duration-300"
        >
          Already have an account?
        </Link>
        <button
          onClick={signUpWithEmailAndPassword}
          disabled={registering}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:bg-white hover:text-red-400 transition-all duration-300"
        >
          Create an account
        </button>
      </div>
      <ErrorText error={error} />
    </form>
  );
};

export default Signup;
