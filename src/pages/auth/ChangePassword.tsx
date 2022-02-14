import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

const ChangePassword = () => {
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [old, setOld] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const passwordChangeRequest = () => {
    if (password !== confirm) {
      setError('Please make sure your passwords match.');
      return;
    }

    if (error !== '') {
      setError('');
    }

    setChanging(true);

    auth.currentUser
      ?.updatePassword(password)
      .then(() => {
        console.log('Password change successful.');
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setChanging(false);
        setError(err.message);
      });
  };

  if (auth.currentUser?.providerData[0]?.providerId !== 'password') {
    return <Navigate to="/" />;
  }

  return (
    <form className="ml-auto mr-auto mt-16 flex flex-col items-center border-2 border-red-400 rounded-md p-6">
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
      <div className="mt-10">
        <Link
          to="/signup"
          className="m-1 p-2 text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300"
        >
          Dont have an account?
        </Link>
        <button
          onClick={passwordChangeRequest}
          disabled={changing}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white transition-all duration-300"
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
