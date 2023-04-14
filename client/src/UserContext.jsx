import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get('/profile').then(res => {
      setId(res.data.id);
      setUserName(res.data.userName);
    });
  }, []);
  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
