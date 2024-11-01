import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

 function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

