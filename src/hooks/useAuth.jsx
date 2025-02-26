import { useContext, useDebugValue } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.UserId ? "Logged In" : "Logged Out"));
  return auth;
};

export default useAuth;
