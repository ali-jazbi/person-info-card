import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useAuth();

  const persist = localStorage.getItem("persist") ? true : false;

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    (async () => {
      !auth?.AccessToken && persist ? await verifyRefreshToken() : setIsLoading(false);
    })();

    // return () => (isMounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? "loading..." : <Outlet />}</>;
};

export default PersistLogin;
