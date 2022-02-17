import { useState } from 'react';
import { getDatabase, ref, update, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const TopicItem: React.FC<{
  title: string;
  content: string;
  category: string;
  user: {
    name: string;
    image: string | null;
  };
  date: number;
  bulbs: number;
  comments: number;
  hasBulbed: boolean;
  id: string;
  key: string;
}> = props => {
  const [bulbs, setBulbs] = useState<number>(props.bulbs);
  const [hasBulbed, setHasBulbed] = useState<boolean>(props.hasBulbed);

  const database = getDatabase();
  const auth = getAuth();

  const bulbPost = async (key: string, bulbs: number) => {
    try {
      const bulbedBy = (await get(ref(database, `topics/${key}`))).val().bulbedBy;

      if (!bulbedBy.includes(auth.currentUser?.email) && !hasBulbed) {
        await update(ref(database, `topics/${key}`), {
          bulbs: bulbs + 1,
          bulbedBy: [...bulbedBy, auth.currentUser?.email],
        });
        setBulbs(bulbs => bulbs + 1);
        setHasBulbed(true);
      } else {
        await update(ref(database, `topics/${key}`), {
          bulbs: bulbs - 1 < 0 ? 0 : bulbs - 1,
          bulbedBy: bulbedBy.filter(
            (email: string) => email !== auth.currentUser?.email
          ),
        });
        setBulbs(bulbs => bulbs - 1);
        setHasBulbed(false);
      }
    } catch (error: any) {}
  };

  const date = new Date(props.date).toLocaleDateString(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="flex flex-col items-center w-[950px] mb-14 cursor-pointer">
      <div className="flex items-center">
        <div className="flex flex-col items-center w-[45px] mr-3">
          <button
            onClick={() => bulbPost(props.id, props.bulbs)}
            className={`${
              hasBulbed
                ? 'text-yellow-400 hover:scale-[2] hover:text-red-400 duration-200 active:scale-150'
                : 'text-red-400 hover:scale-[2] hover:text-yellow-400 duration-200 active:scale-150'
            } `}
          >
            <i className="fa-solid fa-lightbulb fa-2x"></i>
          </button>
          <p className="text-xl">{bulbs ? bulbs : 0}</p>
        </div>
        <Link
          to={`/explore/${props.id}`}
          className="w-[850px] border-2 border-dashed border-red-200 rounded-md p-5 shadow-lg hover:scale-105 duration-300"
        >
          <div className="flex justify-center relative border-b-2 pb-5">
            <p className="absolute left-0 text-sm">{`${date}`}</p>
            <h3 className="text-2xl text-center max-w-[460px] mr-5">
              {props.title}
            </h3>
            <div
              className={`p-1 ${
                props.category === 'idea' ? 'bg-yellow-400' : 'bg-emerald-500'
              } rounded-md mr-1`}
            >
              <h4 className="text-white">{props.category}</h4>
            </div>
            <div className="flex items-center absolute right-10">
              <p className="mr-2">{props.user.name}</p>
              <div>
                {props.user.image ? (
                  <img
                    className="rounded-[50%] h-10"
                    src={props.user.image}
                    alt="User"
                  />
                ) : (
                  <i className="fa-regular fa-circle-user fa-2x"></i>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="indent-10">{props.content}</p>
          </div>
        </Link>
      </div>
      <div className="mt-3">
        <Link
          to={`/explore/${props.id}`}
          className="hover:text-red-400 duration-300"
        >
          {props.comments
            ? `View all ${props.comments} comments`
            : 'No comments yet, be the first one to add one!'}
        </Link>
      </div>
    </article>
  );
};

export default TopicItem;
