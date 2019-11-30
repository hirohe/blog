import axios from 'axios';
import {ResponseData} from "../types/common";

const request = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use((response) => {
  if (response.data) {
    const data = response.data as ResponseData<any>;
    if (data.success !== undefined) {
      if (data.success) {
        response.data = data.data;
        return response;
      } else {
        throw new Error(data.message);
      }
    } else {
      throw new Error('parse response data failed');
    }
  }

  return response;
}, (error) => {
  if (error instanceof Error) {
    // handle Error
    const errorMessage = error.message;
    return Promise.reject(errorMessage);
  }
  return Promise.reject(error);
});

export default request;
