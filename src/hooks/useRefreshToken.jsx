import axios from "../api/axios";
import { endpoints } from "../api/endpoints";

import useDispatchAuth from "./useDispatchAuth";

const useRefreshToken = () => {
  const setAuth = useDispatchAuth();
  let isRefreshing = false;
  let refreshPromise = null;

  const refresh = async () => {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = axios
        .get(endpoints.refresh_endpoint)
        .then((response) => {
          setAuth(response?.data);
          // console.log("response?.data?.result :>> ", response?.data);
          isRefreshing = false;
          refreshPromise = null;
          return response?.data?.AccessToken;
        })
        .catch((error) => {
          isRefreshing = false;
          refreshPromise = null;
          throw error;
        });
    }
    return refreshPromise;
  };

  return refresh;
};

export default useRefreshToken;
