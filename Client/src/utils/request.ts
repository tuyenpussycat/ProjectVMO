import axios from 'axios';
import { API_BASE_URL } from './config';

const request = axios.create({
  baseURL: API_BASE_URL,
});

export function injectAccessToken(token: any) {
  request.defaults.headers.common['authorization'] = 'Bearer ' + token;
}

export { request };
