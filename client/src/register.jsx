import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName: setLoggedInUserName, setId } = useContext(UserContext);
  async function register(e) {
    e.preventDefault();

    const { data } = await axios.post('register', { userName, password });
    setLoggedInUserName(userName);
    setId(data._id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
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
