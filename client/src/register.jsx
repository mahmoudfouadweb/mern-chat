import { useState } from 'react';
import axios from 'axios';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = () => {
    axios.post('/register', { username });
  };
  console.log('username, password :>> ', username, password);
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onClick={register}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full p-2 rounded-sm mb-2 border"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full p-2 rounded-sm mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
