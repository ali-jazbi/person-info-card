import { useNavigate } from "react-router-dom";
import { endpoints } from "../api/endpoints";
import useAxiosPrivate from "./useAxiosPrivate";
import useDispatchAuth from "./useDispatchAuth";

const useLogout = () => {
  const setAuth = useDispatchAuth();
  const navigate = useNavigate();

  const axios = useAxiosPrivate();
  const logout = async () => {
    // @ts-ignore
    try {
      await axios.get(endpoints.logout);
    } catch (err) {
      console.error(err);
    } finally {
      setAuth(null);
      navigate("/login");
    }
  };

  return logout;
};

export default useLogout;
