import { GlobeIcon } from '@heroicons/react/outline';
import TopicItem from '../components/UI/TopicItem';

const DUMMY_POSTS = [
  {
    title: 'I Want To Learn React and TypeScript',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Learn Node.JS',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Build an App',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Build an App',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Build an App',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Build an App',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
  {
    title: 'I Want To Build an App',
    category: 'Development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus id qui quas consequatur perspiciatis, accusamus voluptate adipisci quae magnam neque omnis fugiat dignissimos quidem nisi animi deserunt corporis quisquam modi facere et ducimus reprehenderit. Animi, voluptate deleniti? Quos ullam, blanditiis iusto, corrupti quaerat animi atque expedita at alias ut hic!',
  },
];

const ExploreTopics = () => {
  return (
    <section className="flex flex-col items-center mt-16">
      <div className="flex items-center text-3xl text-red-400">
        <h2>Explore</h2>
        <GlobeIcon className="h-10 ml-2" />
      </div>
      <div className="mt-14">
        {DUMMY_POSTS.map(post => (
          <TopicItem
            title={post.title}
            category={post.category}
            content={post.content}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreTopics;
