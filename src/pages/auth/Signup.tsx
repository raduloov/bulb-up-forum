import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/Errors';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup: React.FC<{ isLoggedIn: boolean }> = props => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn) {
      return navigate('/');
    }
  }, [props.isLoggedIn, navigate]);

  const signUpHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirm) {
      setError('Please make sure your passwords match.');
      return;
    }

    if (error !== '') {
      setError('');
    }

    setRegistering(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error: any) {
      console.log(error);

      if (error.code.includes('auth/weak-password')) {
        setError('Password must be at least 6 characters long.');
      } else if (error.code.includes('auth/email-already-in-use')) {
        setError('Email is already in use.');
      } else {
        setError('Unable to register. Please try again later.');
      }

      setRegistering(false);
    }
  };

  return (
    <form
      onSubmit={signUpHandler}
      className="m-auto flex flex-col items-center border-2 border-red-400 rounded-md p-6"
    >
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
        <div className="flex flex-col mt-5 mb-5">
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
      <ErrorText error={error} />
      <div className="mt-2 flex flex-col">
        <button
          disabled={registering}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:bg-white hover:text-red-400 transition-all duration-300"
        >
          Create an account
        </button>
        <Link
          to="/login"
          className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:text-white hover:bg-red-400 transition-all duration-300"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default Signup;
