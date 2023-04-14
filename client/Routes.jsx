import React, { useContext } from 'react';
import RegisterAndLoginForm from './src/RegisterAndLoginForm';
import { UserContext } from './UserContext';
import Chat from './src/Chat';

const Routes = () => {
  const { userName, id } = useContext(UserContext);

  if (userName) {
    return <Chat />;
  }
  return <RegisterAndLoginForm />;
};

export default Routes;
