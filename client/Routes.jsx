import React, { useContext } from 'react';
import Register from './src/Register';
import { UserContext } from './UserContext';

const Routes = () => {
  const { userName, id } = useContext(UserContext);

  if (userName) {
    return 'Logged in';
  }
  return <Register />;
};

export default Routes;
