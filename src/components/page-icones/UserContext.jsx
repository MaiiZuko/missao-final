import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userIcon, setUserIcon] = useState(null);
  
  return (
    <UserContext.Provider value={{ userIcon, setUserIcon }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
