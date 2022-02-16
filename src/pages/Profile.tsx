import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [username, setUsername] = useState<string | null | undefined>('');

  const auth = getAuth();
  const userPhoto = auth.currentUser?.photoURL;

  onAuthStateChanged(auth, user => {
    if (user) {
      auth.currentUser?.displayName
        ? setUsername(auth.currentUser?.displayName)
        : setUsername(auth.currentUser?.email);
    } else {
      setUsername(null);
    }
  });

  return (
    <div className="ml-auto mr-auto mt-16">
      <div className="flex items-center">
        <h1 className="text-2xl">
          Welcome back, <span className="text-red-400">{username}</span>!
        </h1>
        {userPhoto ? (
          <img className="rounded-[50%] ml-5" src={`${userPhoto}`} alt="User" />
        ) : (
          <i className="fa-regular fa-circle-user fa-5x ml-5"></i>
        )}
      </div>
      <div className="text-xl">
        Total bulbs: <span className="text-red-400">0</span>{' '}
        <i className="fa-regular fa-lightbulb"></i>
      </div>
    </div>
  );
};

export default Profile;
