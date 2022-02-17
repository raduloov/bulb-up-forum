import TopicItem from '../components/UI/TopicItem';
import { Topic } from '../App';

const ExploreTopics: React.FC<{
  topics: Promise<Topic>[] | Topic[] | [];
}> = props => {
  return (
    <section className="flex flex-col items-center mt-16">
      <div className="flex items-center text-3xl text-red-400">
        <h2>
          Explore <i className="fa-solid fa-earth-asia h-10"></i>
        </h2>
      </div>
      <div className="mt-14">
        {props.topics.map((post: any) => (
          <TopicItem
            title={post.title}
            content={post.text}
            category={post.category}
            user={post.user}
            date={post.date}
            bulbs={post.bulbs}
            hasBulbed={post.hasBulbed}
            comments={post.totalComments}
            id={post.id}
            key={post.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreTopics;
