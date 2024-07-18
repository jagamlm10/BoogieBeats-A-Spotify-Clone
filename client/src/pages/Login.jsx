import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [url, setUrl] = useState("");
  const fetchUrl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/auth_url");
      const data = response.data;
      setUrl(data.authUrl);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div className="login">
      <div className="btn">
        <a href={url}>Login with Spotify</a>
      </div>
    </div>
  );
};

export default Login;
