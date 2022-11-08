import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';
import {PageDataType} from 'typings/pageData.type';
export const axiosInstance = axios.create({
  baseURL: Config.API_HOST,
  timeout: 1000 * 300, // 5 minutes
  timeoutErrorMessage: 'request.timed.out',
});

type DefaultApiReponse<T> = {
  pagy: PageDataType;
  data: T;
  status: string;
  message: string | boolean;
  success: boolean;
};
export const api = {
  get: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.get>
  ) {
    return axiosInstance.get<DefaultApiReponse<T>>(...params);
  },
  post: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.post>
  ) {
    return axiosInstance.post<DefaultApiReponse<T>>(...params);
  },
  put: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.put>
  ) {
    return axiosInstance.put<DefaultApiReponse<T>>(...params);
  },
  patch: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.patch>
  ) {
    return axiosInstance.patch<DefaultApiReponse<T>>(...params);
  },
  delete: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.delete>
  ) {
    return axiosInstance.delete<DefaultApiReponse<T>>(...params);
  },
};
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response?.status >= 200 && response?.status <= 299) {
      return response;
    } else if (
      (response?.status >= 400 && response?.status <= 410) ||
      (response?.status <= 500 && response?.status <= 510)
    ) {
      const errorMessage = response?.data?.message || 'Something went wrong';
      throw new Error(errorMessage);
    } else {
      return response;
    }
  },
  (error: any) => {
    if (error?.message === 'Network Error') {
      throw new Error('Please check your internet');
    }
    const errorMessage = error || 'Something  wrong';
    throw new Error(errorMessage);
  },
);

axiosInstance.interceptors.request.use(async config => {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      throw new Error('Network Error');
    }
  } catch (error) {
    return Promise.reject(error);
  }
  // console.log('Starting Request', JSON.stringify(config));

  return config;
});
