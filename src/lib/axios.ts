import Axios from "axios";

import { Logout } from "@/services/app/logout";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Logout();
    }

    return Promise.reject(error);
  },
);

export default axios;

export const setAxiosToken = (token: string | null) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
