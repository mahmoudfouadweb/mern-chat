import React from 'react';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
const RegisterAndLoginForm = () => {
  /* ---------------------------------- STATES --------------------------------- */
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName: setLoggedInUserName, setId } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);

  const url = !isLogin ? 'register' : 'login';

  async function handleRegisterAndLogin(e) {
    e.preventDefault();
    if (!userName || !password) return;
    const { data } = await axios.post(url, { userName, password });
    setLoggedInUserName(userName);
    setId(data._id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleRegisterAndLogin}>
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
          {!isLogin ? 'Register' : 'Login'}
        </button>
        <div className="text-center pt-2">
          {isLogin ? 'Not a' : 'A'}lready a member?
          <button
            href="#"
            className=" text-blue-500"
            onClick={() => setIsLogin(is => !is)}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
