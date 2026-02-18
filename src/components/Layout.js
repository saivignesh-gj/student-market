import { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

function Layout() {
  const { user, setUser, theme, toggleTheme } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem('studentMarketUser');
    setUser(null);
    navigate('/');
  }

  return (
    <>
      <div className="navbar">
        <span className="navbar-brand">Student Market</span>
        <div className="navbar-right">
          {user && (
            <span className="navbar-user">
              {user.university} · {user.username}
            </span>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${location.pathname === '/home' ? 'tab-active' : ''}`}
          onClick={() => navigate('/home')}
        >
          Browse
        </button>
        <button
          className={`tab ${location.pathname === '/sell' ? 'tab-active' : ''}`}
          onClick={() => navigate('/sell')}
        >
          Sell
        </button>
      </div>

      <Outlet />
    </>
  );
}

export default Layout;
