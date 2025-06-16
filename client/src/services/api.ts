import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Memory'de tutulan access token değişkeni
let accessTokenMemory: string | null = null;

export const setAccessTokenMemory = (token: string | null) => {
  accessTokenMemory = token;
};

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// her request'te header'a memory'deki token'ı ekle
apiClient.interceptors.request.use(
  (config) => {
    if (accessTokenMemory) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${accessTokenMemory}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    // Aşağıdaki endpoint'lerde token yenileme denemesi yapma
    const NO_REFRESH_PATHS = [
      "/auth/login",
      "/auth/refresh-token",
      "/auth/register",
      // "/auth/logout"
    ];

    const requestUrl = originalRequest.url;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      requestUrl &&
      !NO_REFRESH_PATHS.some((path) => requestUrl.endsWith(path))
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post<{ accessToken: string }>(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        setAccessTokenMemory(data.accessToken);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        console.error("Refresh token failed for a non-auth path:", refreshError);
        setAccessTokenMemory(null);
        delete apiClient.defaults.headers.common["Authorization"];
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
