import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const UNIVERSITIES = ['UTC Compiègne', 'Sorbonne', 'Université de Lille'];

function Auth() {
  const { setUser, t } = useContext(AppContext);
  const navigate = useNavigate();

  const [university, setUniversity] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!university || !username || !password) {
      setError(t.fillAllFields);
      return;
    }
    const user = { university, username };
    localStorage.setItem('studentMarketUser', JSON.stringify(user));
    setUser(user);
    navigate('/home');
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">{t.appName}</h1>
      <p className="auth-subtitle">{t.subtitle}</p>
      <form onSubmit={handleSubmit}>
        <select
          className="input"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          <option value="">{t.selectUniversity}</option>
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <input
          className="input"
          type="text"
          placeholder={t.usernamePlaceholder}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder={t.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="button-primary" type="submit">
          {t.continue}
        </button>
      </form>
    </div>
  );
}

export default Auth;
