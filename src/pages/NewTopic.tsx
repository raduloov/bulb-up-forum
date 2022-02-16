import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import ErrorText from '../components/Errors';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import CategoryDropdown from '../components/UI/CategoryDropdown';

const NewTopic = () => {
  const [sending, setSending] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState<string>('idea');

  const auth = getAuth();

  const navigate = useNavigate();

  const user = auth.currentUser;
  const displayName = user?.displayName;
  const userEmail = user?.email;
  const userImage = user?.photoURL;

  const shareHandler = async () => {
    if (error !== '') {
      setError('');
    }

    if (title.trim().length === 0 || text.trim().length === 0) {
      setError('Please make sure you have not left any fields empty!');
      return;
    }

    const topic = JSON.stringify({
      title,
      text,
      category,
      user: {
        name: displayName ? displayName : userEmail,
        image: userImage,
      },
      date: Date.now(),
      bulbs: 0,
      bulbedBy: ['this string is here to make firebase work with empty arrays'],
    });

    setSending(true);

    try {
      await fetch(
        'https://bulb-up-forum-default-rtdb.europe-west1.firebasedatabase.app/topics.json',
        {
          method: 'POST',
          body: topic,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return navigate('/');
    } catch (error: any) {
      setError(error.message);
      setSending(false);
    }
  };

  return (
    <div className="m-auto flex flex-col items-center border-2 border-red-400 rounded-md p-6">
      <h3 className="text-2xl">
        What are you <span className="text-red-400">thinking</span> about?
      </h3>
      <p className="text-lg mt-2">
        Share your <span className="text-red-400">idea</span> or ask a{' '}
        <span className="text-red-400">question</span>
      </p>
      {sending && <LoadingSpinner />}
      {!sending && (
        <div className="mt-5">
          <div className="flex flex-col mt-5">
            <label htmlFor="title">Title:</label>
            <input
              onChange={event => setTitle(event.target.value)}
              className="p-2 text-lg w-[500px] bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
              type="text"
              id="title"
              value={title}
            />
          </div>
          <div className="flex items-center">
            <CategoryDropdown
              onPickIdea={() => setCategory('idea')}
              onPickQuestion={() => setCategory('question')}
            />
            {category === 'idea' && (
              <div className="ml-2 border-2 border-yellow-400 bg-yellow-400 rounded-md p-1 text-white animate-[appear_0.5s_ease-out_forwards]">
                <p>
                  an idea <i className="fa-regular fa-lightbulb"></i>
                </p>
              </div>
            )}
            {category === 'question' && (
              <div className="ml-2 border-2 border-emerald-500 bg-emerald-500 rounded-md p-1 text-white animate-[appear_0.5s_ease-out_forwards]">
                <p>
                  a question <i className="fa-solid fa-question"></i>
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-5 mb-5">
            <textarea
              onChange={event => setText(event.target.value)}
              className="p-2 min-h-[200px] resize-none bg-slate-200 rounded-md outline-none hover:bg-slate-100 focus:bg-slate-100"
              value={text}
            ></textarea>
          </div>
        </div>
      )}
      <ErrorText error={error} />
      <div className="mt-2 flex">
        <button
          onClick={shareHandler}
          disabled={sending}
          className="m-1 p-2 text-white border-2 border-red-400 bg-red-400 rounded-md hover:text-red-400 hover:bg-white"
        >
          {category === 'idea' ? 'Share your idea!' : 'Ask your question!'}
        </button>
      </div>
    </div>
  );
};

export default NewTopic;
