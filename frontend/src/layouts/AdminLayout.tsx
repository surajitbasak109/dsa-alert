import clsx from 'clsx';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

const AdminLayout = () => {
  const defaultLinkClassName = 'text-sm text-gray-600';
  const [sidebarVisible, setSidebarVisible] = useState(true);
  return (
    <div
      className="dsa-root"
      style={{
        minBlockSize: '100vh'
      }}>
      <section
        style={{ insetBlockStart: '0px', blockSize: '80px' }}
        className="sticky flex items-center justify-between w-full p-4 bg-white border-b border-gray-300 z-[1000] dsa-toolbar">
        <div className="flex items-center gap-4">
          <button
            className="hidden w-8 h-8 text-center text-white rounded-full cursor-pointer bg-sky-600 md:inline-block"
            type="button"
            onClick={() => setSidebarVisible((prev) => !prev)}>
            <svg
              fill="currentColor"
              className="inline-block w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            DSA Alert Dashboard
          </h1>
        </div>
        <div className="text-gray-800">Admin</div>
      </section>
      <aside
        className={clsx(
          'transition-all duration-300 ease-in-out dsa-navigation',
          !sidebarVisible && 'inline-size-0'
        )}>
        <div
          style={{
            blockSize: 'calc(-147px + 100vh)',
            insetBlockStart: '90px'
          }}
          className="dsa-navigation-container">
          <nav className="dsa-navigation-content">
            <div className="absolute top-4 end-[16px]">
              <button
                className="w-8 h-8 cursor-pointer"
                onClick={() => setSidebarVisible((prev) => !prev)}>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                </svg>
              </button>
            </div>
            <div id="sidebar">
              <h2 className="py-5 text-lg font-bold leading-6 ps-7 pe-8">
                Dashboard
              </h2>
              <hr className="border-transparent" />
              <div className="mt-0 mb-10">
                <ul className="ps-7 pe-8">
                  <li className="my-2">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? 'font-bold text-[#006ce0] text-sm'
                          : defaultLinkClassName
                      }
                      to="/admin/dashboard">
                      Home
                    </NavLink>
                  </li>
                  <li className="my-2">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? 'font-bold text-[#006ce0] text-sm'
                          : defaultLinkClassName
                      }
                      to="/admin/posts">
                      Posts
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </aside>
      <main
        style={{ inlineSize: 'calc(100% - 280px)' }}
        className={clsx('bg-gray-100 contents sticky z-[850]')}>
        <div className="mb-24 dsa-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
