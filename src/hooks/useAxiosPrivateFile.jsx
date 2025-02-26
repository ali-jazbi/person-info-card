import { axiosPrivateFile } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivateFile = () => {
  const refresh = useRefreshToken();
  const auth = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivateFile.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.AccessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateFile.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;

        if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivateFile(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateFile.interceptors.request.eject(requestIntercept);
      axiosPrivateFile.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivateFile;
};

export default useAxiosPrivateFile;
