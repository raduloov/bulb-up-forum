import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, updatePassword } from 'firebase/auth';

const ChangePassword = () => {
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [old, setOld] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const auth = getAuth();

  const navigate = useNavigate();

  const passwordChangeHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!auth.currentUser) {
      return;
    }

    if (password !== confirm) {
      setError('Please make sure your passwords match.');
      return;
    }

    if (error !== '') {
      setError('');
    }

    setChanging(true);

    const user = auth.currentUser;

    try {
      await updatePassword(user, password);
      console.log('Password change successful.');
      navigate('/');
    } catch (error: any) {
      console.log(error);

      if (error.code.includes('auth/invalid-email')) {
        setError('Invalid email.');
      } else if (error.code.includes('auth/email-already-in-use')) {
        setError('Email is already in use.');
      } else {
        setError('Unable to register. Please try again later.');
      }

      setChanging(false);
      setError(error.message);
    }
  };

  if (auth.currentUser?.providerData[0]?.providerId !== 'password') {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={passwordChangeHandler}
      className="ml-auto mr-auto mt-16 flex flex-col items-center border-2 border-red-400 rounded-md p-6"
    >
      <h3 className="text-2xl">Change your password</h3>
      <div className="mt-5">
        <div className="flex flex-col mt-5">
          <label htmlFor="old">Old password:</label>
          <input
            onChange={event => setOld(event.target.value)}
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="old"
            value={old}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="password">New password:</label>
          <input
            onChange={event => setPassword(event.target.value)}
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="password"
            value={password}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="confirm">Confirm new password:</label>
          <input
            onChange={event => setConfirm(event.target.value)}
            className="p-2 bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
            type="password"
            id="confirm"
            value={confirm}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col">
        <button
          disabled={changing}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Change Password
        </button>
        <Link
          to="/profile"
          className="text-center m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default ChangePassword;
