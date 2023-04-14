import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!userName) return;
    axios.get('/profile').then(res => {
      setId(res.data._id);
      setUserName(res.data.userName);
    });
  }, [userName]);
  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
