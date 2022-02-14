import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExploreTopics from './pages/ExploreTopics';
import Home from './pages/Home';
import SidebarLeft from './components/Sidebars/SidebarLeft';
import SidebarRight from './components/Sidebars/SidebarRight';
import Layout from './Layout/Layout';
import MainSection from './Layout/MainSection';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <SidebarLeft />
        <MainSection>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/explore" element={<ExploreTopics />} />
          </Routes>
        </MainSection>
        <SidebarRight />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
