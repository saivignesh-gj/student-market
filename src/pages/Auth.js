import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const UNIVERSITIES = ['UTC Compiègne', 'Sorbonne', 'Université de Lille'];

function Auth() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [university, setUniversity] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!university || !username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const user = { university, username };
    localStorage.setItem('studentMarketUser', JSON.stringify(user));
    setUser(user);
    navigate('/home');
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Student Market</h1>
      <p className="auth-subtitle">Buy &amp; sell in your student city.</p>
      <form onSubmit={handleSubmit}>
        <select
          className="input"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          <option value="">Select university</option>
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="button-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Auth;
