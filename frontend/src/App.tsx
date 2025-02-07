import { Route, Routes } from 'react-router';
import Home from '@pages/public/Home';
import Admin from '@/pages/admin';
import Post from './pages/admin/Post';
import AdminLayout from './layouts/AdminLayout';
import RedirectToDashboard from './pages/admin/RedirectToDashboard';
import PostPreview from './pages/admin/Post/Preview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<RedirectToDashboard />} />
        <Route path="dashboard" element={<Admin />} />
        <Route path="posts" element={<Post />} />
        <Route path="posts/:id" element={<PostPreview />} />
      </Route>
      <Route path="*" element={<div>404 Not found</div>} />
    </Routes>
  );
}

export default App;
