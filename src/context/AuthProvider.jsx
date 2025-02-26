import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(() => null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={setAuth}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
