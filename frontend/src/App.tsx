import { Route, Routes } from 'react-router';
import Home from '@pages/public/Home';
import Admin from '@/pages/admin';
import Post from './pages/admin/Post';
import AdminLayout from './layouts/AdminLayout';
import RedirectToDashboard from './pages/admin/RedirectToDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<RedirectToDashboard />} />
        <Route path="dashboard" element={<Admin />} />
        <Route path="posts" element={<Post />} />
      </Route>
      <Route path="*" element={<div>404 Not found</div>} />
    </Routes>
  );
}

export default App;
