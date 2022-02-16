import { getDatabase, ref, update, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import TopicItem from '../components/UI/TopicItem';
import { Topic } from '../App';

// interface Topics {
//   topics: {
//     id: string;
//     title: string;
//     text: string;
//     category: string;
//     user: {
//       name: string;
//       image: string | null;
//     };
//     date: number;
//     bulbs: number;
//     hasBulbed: boolean;
//   }[];
// }

const ExploreTopics: React.FC<{
  topics: Promise<Topic>[] | Topic[] | [];
}> = props => {
  const database = getDatabase();
  const auth = getAuth();

  // const topics = props.topics.map(async post => {
  //   const bulbedBy = (await get(ref(database, `topics/${post.id}`))).val()
  //     .bulbedBy;

  //   let hasBulbed = false;
  //   if (!bulbedBy.includes(auth.currentUser?.uid)) {
  //     hasBulbed = true;
  //   }
  // }

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
            id={post.id}
            key={post.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreTopics;
