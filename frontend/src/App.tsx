import { Route, Routes } from 'react-router';
import Home from '@pages/public/Home';
import Admin from '@pages/admin/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
