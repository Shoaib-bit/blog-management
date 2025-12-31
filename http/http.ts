import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    // Get token from cookies (client-side)
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((c) =>
        c.trim().startsWith("accessToken=")
      );
      if (tokenCookie) {
        const accessToken = tokenCookie.split("=")[1];
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Remove cookie and redirect to login page in server action if user is not authenticated or token is expired
      //logout(true) // true to redirect the user to /login in server
    }

    return Promise.reject(error);
  }
);

export const http = axiosInterceptorInstance;
