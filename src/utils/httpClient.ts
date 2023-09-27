import axios, { AxiosRequestConfig } from "axios";
import { GetAccessToken } from "../types/GetAccessToken";

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getConfig = (accessToken: string | null): AxiosRequestConfig => ({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": apiKey,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
});

export const createHttpClient = (getAccessToken: GetAccessToken) => ({
  get: async (url: string): Promise<unknown> => {
    const accessToken = getAccessToken();
    const config: AxiosRequestConfig = getConfig(accessToken);
    const response = await axios.get(url, config);

    return response.data;
  },

  post: async (url: string, data?: unknown): Promise<unknown> => {
    const accessToken = getAccessToken();
    const config = getConfig(accessToken);
    const response = await axios.post(url, data, config);

    return response.data;
  },

  patch: async (url: string, data?: unknown): Promise<unknown> => {
    const accessToken = getAccessToken();
    const config = getConfig(accessToken);
    const response = await axios.patch(url, data, config);

    return response.data;
  },

  delete: async (url: string): Promise<void> => {
    const accessToken = getAccessToken();
    const config = getConfig(accessToken);

    await axios.delete(url, config);
  },

  downloadFile: async (url: string): Promise<unknown> => {
    const accessToken = getAccessToken();
    const baseConfig = getConfig(accessToken);

    const config: AxiosRequestConfig = {
      ...baseConfig,
      responseType: "blob",
      headers: {
        ...baseConfig.headers,
        "Content-Type": undefined,
        Accept: undefined,
      },
    };

    const response = await axios.get(url, config);

    return response.data;
  },

  uploadFile: async (url: string, file: Blob): Promise<unknown> => {
    const accessToken = getAccessToken();
    const baseConfig = getConfig(accessToken);

    const config: AxiosRequestConfig = {
      ...baseConfig,
      headers: {
        ...baseConfig.headers,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(url, formData, config);

    return response.data;
  },
});

export type HttpClient = ReturnType<typeof createHttpClient>;
