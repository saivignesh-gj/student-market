import { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

function Layout() {
  const { user, setUser, theme, toggleTheme, lang, changeLang, t } = useContext(AppContext);
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
        <span className="navbar-brand">{t.appName}</span>
        <div className="navbar-right">
          {user && (
            <span className="navbar-user">
              {user.university} · {user.username}
            </span>
          )}
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => changeLang(e.target.value)}
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? t.switchLight : t.switchDark}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            {t.logOut}
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${location.pathname === '/home' ? 'tab-active' : ''}`}
          onClick={() => navigate('/home')}
        >
          {t.browse}
        </button>
        <button
          className={`tab ${location.pathname === '/sell' ? 'tab-active' : ''}`}
          onClick={() => navigate('/sell')}
        >
          {t.sell}
        </button>
      </div>

      <Outlet />
    </>
  );
}

export default Layout;
