import axios from 'axios';
import Rigester from './Register';
import { UserContext, UserContextProvider } from '../UserContext';
import { useContext } from 'react';

function App() {
  axios.defaults.baseURL = 'http://localhost:4040/';
  axios.defaults.withCredentials = true;
  const { userName } = useContext(UserContext)
  return (
    <UserContextProvider>
      <Rigester />
    </UserContextProvider>
  );
}

export default App;
