import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

import Home from './pages/Home';
import ExploreTopics from './pages/ExploreTopics';
import SidebarLeft from './components/Sidebars/SidebarLeft';
import SidebarRight from './components/Sidebars/SidebarRight';
import Layout from './Layout/Layout';
import MainSection from './Layout/MainSection';
import config from './config/firebase-config';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ChangePassword from './pages/auth/ChangePassword';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import NotFound from './pages/NotFound';
import NewTopic from './pages/NewTopic';
import LoadingSpinner from './components/UI/LoadingSpinner';
import TopicPage from './pages/Topic';

initializeApp(config.firebase);

export interface Topic {
  id: string;
  title: string;
  text: string;
  category: string;
  user: {
    name: string;
    image: string | null;
    userId: string;
  };
  date: number;
  bulbs: number;
  comments: any;
  totalComments: number;
  hasBulbed: boolean;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Promise<Topic>[] | Topic[] | []>([]);

  const auth = getAuth();
  const database = getDatabase();

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const getAllPosts = useCallback(async () => {
    const response = await fetch(
      'https://bulb-up-forum-default-rtdb.europe-west1.firebasedatabase.app/topics.json'
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch posts. :(');
    }

    const transformedPosts = [];

    for (const key in data) {
      const postObj = {
        id: key,
        ...data[key],
      };

      transformedPosts.push(postObj);
    }

    return transformedPosts;
  }, []);

  const setTopics = useCallback(async () => {
    setIsLoading(true);

    const data = await getAllPosts();

    const loadedTopics: Promise<Topic>[] = data.map(async post => {
      const bulbedBy = await (await get(ref(database, `topics/${post.id}`))).val()
        .bulbedBy;

      let hasBulbed = false;
      if (bulbedBy.includes(auth.currentUser?.email)) {
        hasBulbed = true;
      }

      return {
        id: post.id,
        title: post.title,
        text: post.text,
        category: post.category,
        user: {
          name: post.user.name,
          image: post.user.image,
          userId: post.user.userId,
        },
        date: post.date,
        bulbs: post.bulbs,
        comments: post.comments,
        totalComments: post.totalComments,
        hasBulbed,
      };
    });

    const resolved = await Promise.all(loadedTopics);
    const sorted = resolved.sort((a, b) => b.date - a.date);

    setPosts(sorted);
    setIsLoading(false);
  }, [getAllPosts, auth.currentUser, database]);

  useEffect(() => {
    setTopics();
  }, [setTopics]);

  const searchHandler = async (searchTerm: string) => {
    setIsLoading(true);

    const data = await getAllPosts();
    const filtered = data.filter((item: Topic) => {
      if (searchTerm === '') {
        return item;
      } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
    });

    setIsLoading(false);
    setPosts(filtered);
  };

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn} onSearch={searchHandler}>
        <SidebarLeft />
        <MainSection>
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <Routes>
              <Route path="/" element={<Navigate to="/explore" />} />
              <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
              <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} />} />
              <Route path="/explore">
                <Route index element={<ExploreTopics topics={posts} />} />
                <Route
                  path="/explore/:topicId"
                  element={<TopicPage isLoggedIn={isLoggedIn} topics={posts} />}
                />
              </Route>
              <Route
                path="/profile"
                element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
              >
                <Route index element={<Profile />} />
                <Route
                  path="/profile/change-password"
                  element={<ChangePassword />}
                />
              </Route>
              <Route
                path="/new-post"
                element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
              >
                <Route index element={<NewTopic />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </MainSection>
        <SidebarRight />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
