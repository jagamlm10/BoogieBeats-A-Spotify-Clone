import { useState, useEffect } from "react";
import axios from "axios";

// Custom Hook for getting a fresh access token everytime
const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  //   Fetching data whenever the code changes
  const fetchTokenInfo = async () => {
    axios
      .post("http://localhost:3000/api/auth/callback", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        window.history.pushState({}, null, "/");
      })
      .catch((e) => console.log(e));
  };

  // For refreshing the token

  useEffect(() => {
    if (!refreshToken) return;
    const interval = setInterval(() => {
      console.log("refreshing..");
      axios
        .post("http://localhost:3000/api/auth/refresh", {
          refreshToken,
        })
        .then((res) => setAccessToken(res.data.accessToken))
        .catch((e) => console.log(e));
    }, (3600 - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  useEffect(() => {
    fetchTokenInfo();
  }, [code]);

  return accessToken;
};

export default useAuth;
