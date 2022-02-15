const TopicItem: React.FC<{
  title: string;
  category: string;
  content: string;
}> = props => {
  return (
    <article className="max-w-[850px] mb-14">
      <div className="flex justify-center w-full relative">
        <h3 className="text-2xl text-center max-w-[460px]">{props.title}</h3>
        <div className="flex items-center absolute right-10">
          <div className="p-1 bg-red-400 rounded-md mr-1">
            <h4 className="text-white">{props.category.toUpperCase()}</h4>
          </div>
          <div>
            <i className="fa-regular fa-circle-user fa-2x"></i>
          </div>
        </div>
      </div>
      <div className="mt-4 border-b-2 pb-2">
        <p className="indent-10">{props.content}</p>
      </div>
    </article>
  );
};

export default TopicItem;
