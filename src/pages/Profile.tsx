import { useCallback, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, get, ref } from 'firebase/database';

const Profile = () => {
  const [username, setUsername] = useState<string | null | undefined>('');
  const [totalBulbs, setTotalBulbs] = useState<number>(0);

  const auth = getAuth();
  const userName = auth.currentUser?.displayName;
  const userEmail = auth.currentUser?.email;
  const userPhoto = auth.currentUser?.photoURL;
  const userId = auth.currentUser?.uid;

  const database = getDatabase();

  onAuthStateChanged(auth, user => {
    if (user) {
      auth.currentUser?.displayName ? setUsername(userName) : setUsername(userEmail);
    } else {
      setUsername(null);
    }
  });

  const getTotalBulbs = useCallback(async () => {
    const userPosts = Object.values(
      (await get(ref(database, `topics/`))).val()
    ).filter((post: any) => post.user.userId === userId);

    // const bulbs = userPosts.reduce((a: number, b: number) => a.bulbs + b.bulbs, 0);
    let bulbs = 0;
    userPosts.forEach((post: any) => {
      bulbs += post.bulbs;
    });

    setTotalBulbs(bulbs);
  }, [database, userId]);

  useEffect(() => {
    getTotalBulbs();
  }, [getTotalBulbs]);

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
        Total bulbs: <span className="text-red-400">{totalBulbs}</span>{' '}
        <i className="fa-regular fa-lightbulb"></i>
      </div>
    </div>
  );
};

export default Profile;
