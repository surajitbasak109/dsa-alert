import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="container w-full mx-auto">
      <h1>Home Page</h1>
      <p>Important Links</p>
      <ul className="px-3">
        <li>
          <Link className="text-blue-600 hover:underline" to="/admin">
            Admin
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 hover:underline" to="/admin/posts">
            Posts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
