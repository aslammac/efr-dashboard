const axios = require("axios");
import { endpoints } from "@/constants/endpoints";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import store from "storejs";

const axiosApiInstance = axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    // const session = await decryptedSession();
    // console.log("session", session);
    let access_token = getCookie(
      process.env.NEXT_PUBLIC_SESSION_NAME as string
    );
    if (!access_token) {
      access_token = store.get(
        process.env.NEXT_PUBLIC_SESSION_NAME as string
      ) as string;
      setCookie(process.env.NEXT_PUBLIC_SESSION_NAME as string, access_token);
    }

    config.headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    // const session = await encryptedSession();

    const refresh_token = getCookie(process.env.NEXT_PUBLIC_REFRESH as string);
    const originalRequest = error.config;
    console.log("error response", error.response);
    if (
      (error.response.status === 422 &&
        error.response.data.error === "Signature has expired" &&
        !originalRequest._retry) ||
      (error.response.status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        const req = await axios.post(endpoints.auth.refresh, null, {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        setCookie(
          process.env.NEXT_PUBLIC_SESSION_NAME as string,
          req.data.access_token
        );
        console.log("refreshed", req);
        axiosApiInstance.defaults.headers.common["Authorization"] =
          "Bearer " + req.data.access_token;
        return axiosApiInstance(originalRequest);
      } catch (error) {
        console.log("error", error);
        deleteCookie(process.env.NEXT_PUBLIC_SESSION_NAME as string);
        deleteCookie(process.env.NEXT_PUBLIC_REFRESH as string);
        toast.error("Session expired");
        location.replace("/auth");
      }

      // const token = encrypt({
      //   access_token: req.data.access_token,
      //   refresh_token: session?.refresh_token,
      // });
      // setCookie("encryption", token);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
