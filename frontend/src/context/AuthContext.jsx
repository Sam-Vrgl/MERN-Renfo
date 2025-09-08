/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const loginAction = (data) => {
    // data should contain { token, userId, role } from backend login response
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify({ id: data.userId, role: data.role }));
    setToken(data.token);
    setUser({ id: data.userId, role: data.role });
  };

  const logoutAction = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};