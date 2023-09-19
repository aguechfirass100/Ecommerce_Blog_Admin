import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const redirect = () => {
    setTimeout(() => {
      window.location.replace('http://localhost:3001/');
    }, 1000);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    login(dispatch, { username, password });
    redirect();
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Admin Dashboard Login</h2>
      <form
        style={{
          padding: 20,
          border: '1px solid #ccc',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          style={{
            padding: 10,
            marginBottom: 20,
            width: 200,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{
            padding: 10,
            marginBottom: 20,
            width: 200,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
        <button
          onClick={handleClick}
          style={{
            padding: 10,
            width: 100,
            cursor: 'pointer',
            background: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
