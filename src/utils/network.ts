import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import auth from '@react-native-firebase/auth';
import jwtDecode from 'jwt-decode';
import config from 'src/config';
import { store } from 'src/store';

const defaultRequestConfig: AxiosRequestConfig = {
  baseURL: config.apiHost,
  timeout: config.networkTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const agent = axios.create({ ...defaultRequestConfig });

const isTokenExpired = (token: string) => {
  const { exp } = jwtDecode(token) as any;
  const isExpired = Date.now() / 1000 > exp;
  return isExpired;
};

// set header before sending the request
const appendHeader = async (axiosConfig: AxiosRequestConfig) => {
  const state = store.getState();
  const { accessToken } = state.auth;

  if (!accessToken) throw Error('No Access Token');

  // token is still valid, append to header
  if (!isTokenExpired(accessToken)) {
    axiosConfig.headers.Authorization = accessToken;
    return axiosConfig;
  }

  // ensure user is still login
  const currentUser = await auth().currentUser;
  if (!currentUser) throw Error('User not login');

  // token expired, get new token and append to header
  const newToken = await currentUser.getIdToken(); // this will then trigger onIdTokenChanged in authListener.tsx
  axiosConfig.headers.Authorization = newToken;
  console.log('token refreshed...');

  return axiosConfig;
};

const errorHandler = (err: any) => Promise.reject(err);

agent.interceptors.request.use(appendHeader, errorHandler);

const process = (fn: Promise<AxiosResponse<any>>, timing = 500): Promise<AxiosResponse<any>> =>
  new Promise((resolve) => {
    if (__DEV__) {
      // slow down abit for apis response while in local development
      setTimeout(() => resolve(fn), timing);
    } else {
      resolve(fn);
    }
  });

export const get = (_uri: string, _config?: AxiosRequestConfig) => process(agent.get(_uri, _config));

export const post = (_uri: string, _data?: any, _config?: AxiosRequestConfig) =>
  process(agent.post(_uri, _data, _config));

export const put = (_uri: string, _data?: any, _config?: AxiosRequestConfig) =>
  process(agent.put(_uri, _data, _config));

export const patch = (_uri: string, _data?: any, _config?: AxiosRequestConfig) =>
  process(agent.patch(_uri, _data, _config));

export const del = (_uri: string, _config?: AxiosRequestConfig) => process(agent.delete(_uri, _config));
