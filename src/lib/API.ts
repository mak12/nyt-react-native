import {store} from '@redux/store';
import {APP_URLS} from '@utilities/constants';
import {APIError} from '@utilities/types';
import {getExceptionPayload, showAlertDialog} from '@utilities/utils';
import axios from 'axios';

const instance = axios.create({
  baseURL: APP_URLS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    console.log('request url ', config.url);
    console.log('request url ', config.baseURL);

    if (token) {
      config.headers!!['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const token = store.getState().auth.token;
    const originalConfig = err.config;
    const requestUrl = originalConfig.url as String;
    console.log('request url ', err);
    if (!requestUrl.includes('auth/login') && err.response) {
      // Access Token was expired
      // here add logic to refresh token or logout user
      // if (err.response.status === 401 && !originalConfig._retry) {
      //   originalConfig._retry = true;
      //   try {
      //     const rs = await instance.post("/auth/refreshtoken");
      //     const { accessToken } = rs.data;
      //     dispatch(refreshToken(accessToken));
      //     return axiosInstance(originalConfig);
      //   } catch (_error) {
      //     return Promise.reject(_error);
      //   }
      // }
    }

    return Promise.reject(err);
  },
);
export default instance;

export const InternalError: APIError = {
  message: 'Some error occured',
  code: -500,
};
