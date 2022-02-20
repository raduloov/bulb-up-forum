import { getAuth } from 'firebase/auth';
import { getDatabase, get, ref, update } from 'firebase/database';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Topic } from '../App';
import ErrorText from '../components/Errors';
import Comment from '../components/UI/Comment';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const TopicPage: React.FC<{
  topics: Promise<Topic>[] | Topic[] | [];
  isLoggedIn: boolean;
}> = props => {
  const { topicId } = useParams();

  const [comment, setComment] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user?.displayName;
  const userEmail = user?.email;
  const userImage = user?.photoURL;

  const database = getDatabase();

  const navigate = useNavigate();

  let curTopic: any;
  props.topics.forEach((topic: any) => {
    if (topic.id === topicId) {
      curTopic = topic;
    }
  });

  if (!curTopic) {
    return <p>Error</p>;
  }

  const date = new Date(curTopic.date).toLocaleDateString(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const sortedComments = Object.values(curTopic.comments)
    .filter(comment => comment !== '_')
    .sort((a: any, b: any) => b.date - a.date);

  const addCommentHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!props.isLoggedIn) {
      return navigate('/login');
    }

    setShowTextbox(true);

    if (error !== '') {
      setError('');
    }

    if (comment.trim().length === 0) {
      setError('Please make sure you are not posting an empty comment!');
      return;
    }

    const newComment = {
      commentId: Math.random().toString().slice(1),
      comment,
      user: {
        name: displayName ? displayName : userEmail,
        image: userImage,
      },
      date: Date.now(),
    };

    setSending(true);
    const comments = (await get(ref(database, `topics/${topicId}`))).val().comments;

    try {
      await update(ref(database, `topics/${topicId}`), {
        totalComments: comments.length,
        comments: [...comments, newComment],
      });
      setSending(false);
      window.location.reload();
    } catch (error: any) {
      setError(error.message);
      setSending(false);
    }
  };

  return (
    <article className="flex flex-col items-center w-[950px] mt-16 mb-14">
      <div className="flex items-center">
        <div className="w-[850px] border-2 border-dashed border-red-200 rounded-md p-5 shadow-lg hover:scale-105 duration-300">
          <div className="flex justify-between relative border-b-2 pb-5">
            <p className="text-sm">{`${date}`}</p>
            <h3 className="text-2xl text-center max-w-[460px] ml-2 mr-5">
              {curTopic.title}
            </h3>
            <div className="flex">
              <div
                className={`p-1 ${
                  curTopic.category === 'idea' ? 'bg-yellow-400' : 'bg-emerald-500'
                } rounded-md mr-1 h-8`}
              >
                <h4 className="text-white">{curTopic.category}</h4>
              </div>
              <div className="flex items-center">
                <p className="mr-2">{curTopic.user.name}</p>
                <div>
                  {curTopic.user.image ? (
                    <img
                      className="rounded-[50%] h-10"
                      src={curTopic.user.image}
                      alt="User"
                    />
                  ) : (
                    <i className="fa-regular fa-circle-user fa-2x"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="indent-10">{curTopic.text}</p>
          </div>
        </div>
      </div>
      {sending && <LoadingSpinner />}
      {!sending && (
        <div>
          <div className="mt-5 flex flex-col">
            {!showTextbox && (
              <button
                onClick={() => setShowTextbox(true)}
                className="ml-auto mr-auto mb-2 p-2 text-red-400 border-2 border-red-400 rounded-md hover:text-white hover:bg-red-400 transition-all duration-300"
              >
                <i className="fa-regular fa-comment"></i> Add new comment
              </button>
            )}
            {showTextbox && (
              <form onSubmit={addCommentHandler} className="flex flex-col">
                <textarea
                  onChange={event => setComment(event.target.value)}
                  value={comment}
                  className="p-2 min-h-[100px] min-w-[200px] resize-none bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
                  name="comment"
                  id="comment"
                ></textarea>

                {error && (
                  <div className="flex m-auto">
                    <ErrorText error={error} />
                  </div>
                )}
                <button className="ml-auto mr-auto mt-2 p-2 text-red-400 border-2 border-red-400 rounded-md hover:text-white hover:bg-red-400 transition-all duration-300">
                  <i className="fa-solid fa-paper-plane"></i> Post
                </button>
              </form>
            )}
          </div>
          <div className="mt-6">
            {sortedComments.map((comment: any) => (
              <Comment
                user={comment.user}
                text={comment.comment}
                date={comment.date}
                id={comment.commentId}
                key={comment.commentId}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default TopicPage;
