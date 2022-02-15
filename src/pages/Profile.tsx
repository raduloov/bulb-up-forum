import { getAuth } from 'firebase/auth';

const Profile = () => {
  const auth = getAuth();

  const user = auth.currentUser;
  const displayName = user?.displayName;
  const userEmail = user?.email;
  const userPhoto = user?.photoURL;

  return (
    <div className="ml-auto mr-auto mt-16">
      <div className="flex items-center">
        <h1 className="text-2xl">
          Welcome back,{' '}
          <span className="text-red-400">{`${
            displayName ? displayName : userEmail
          }`}</span>
          !
        </h1>
        {userPhoto ? (
          <img className="rounded-[50%] ml-5" src={`${userPhoto}`} alt="User" />
        ) : (
          <i className="fa-regular fa-circle-user h-28"></i>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
