import React from 'react';

const Comment: React.FC<{
  user: {
    name: string;
    image: string | null;
  };
  text: string;
  date: number;
  id: string;
  key: string;
}> = props => {
  const date = new Date(props.date).toLocaleDateString(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="w-[600px] border-2 border-dashed border-red-200 rounded-md p-3 shadow-lg m-2">
      <div className="flex items-center justify-between text-lg border-b-2 pb-2">
        <div className="flex items-center">
          <i className="fa-regular fa-comment mr-1"></i>
          <p className="text-sm">{date}</p>
        </div>
        <div className="flex items-center">
          {props.user.image ? (
            <img
              className="rounded-[50%] h-8 mr-1"
              src={props.user.image}
              alt="User"
            />
          ) : (
            <i className="text-3xl fa-regular fa-circle-user mr-1"></i>
          )}
          <p>{props.user.name}</p>
        </div>
      </div>
      <div className="mt-2 text-md indent-5 pt-2">{props.text}</div>
    </div>
  );
};

export default Comment;
