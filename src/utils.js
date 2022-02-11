import { useState, useEffect } from "react";
import axios from "axios";

export const SpotifyURL = "https://api.spotify.com/v1";

export const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      try {
        const response = await axios.get("/auth/token");
        setToken(response.data.access_token);
      } catch {
        return;
      }
    }

    getToken();
  }, []);

  return token;
};

export const useProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const token = useToken();

  useEffect(() => {
    function getUser() {
      try {
        axios
          .get(`${SpotifyURL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => setUserInfo(data));
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [token]);

  return userInfo;
};
