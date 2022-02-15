import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExploreTopics from './pages/ExploreTopics';
import Home from './pages/Home';
import SidebarLeft from './components/Sidebars/SidebarLeft';
import SidebarRight from './components/Sidebars/SidebarRight';
import Layout from './Layout/Layout';
import MainSection from './Layout/MainSection';
import { initializeApp } from 'firebase/app';
import config from './config/firebase-config';
import { getAuth } from 'firebase/auth';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ChangePassword from './pages/auth/ChangePassword';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import NotFound from './pages/NotFound';

initializeApp(config.firebase);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User detected.');
        setIsLoggedIn(true);
      } else {
        console.log('No user detected.');
        setIsLoggedIn(false);
      }
    });
  });

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn}>
        <SidebarLeft />
        <MainSection>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
            <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} />} />
            <Route path="/explore" element={<ExploreTopics />} />
            <Route
              path="/profile"
              element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
            >
              <Route index element={<Profile />} />
              <Route path="/profile/change-password" element={<ChangePassword />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainSection>
        <SidebarRight />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
