import React, { useContext } from 'react';
import Register from './src/RegisterAndLoginForm';
import { UserContext } from './UserContext';

const Routes = () => {
  const { userName, id } = useContext(UserContext);

  if (userName) {
    return 'Logged in' + ' Hello ' + userName;
  }
  return <Register />;
};

export default Routes;
