import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import RegisterAndLoginForm from './RegisterAndLoginForm';
import Chat from './Chat';

const Routes = () => {
  const { userName, id } = useContext(UserContext);

  if (userName) {
    return <Chat />;
  }
  return <RegisterAndLoginForm />;
};

export default Routes;
