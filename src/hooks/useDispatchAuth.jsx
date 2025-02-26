import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthProvider";

const useDispatchAuth = () => useContext(AuthDispatchContext);
export default useDispatchAuth;
