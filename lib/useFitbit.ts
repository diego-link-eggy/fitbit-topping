import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useFitbit = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) return;

      try {
        const res = await axios.post("/api/auth/refresh", { refresh_token: refreshToken });
        Cookies.set("access_token", res.data.access_token, { secure: true });
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }, 5 * 60 * 1000); // every 5 min

    return () => clearInterval(interval);
  }, []);
};
