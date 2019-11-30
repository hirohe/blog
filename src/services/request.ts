import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use((response) => {
  if (response.data) {
    if (response.data.success) {
      return response.data.data;
    }
    return Promise.reject(response.data.message)
  }
}, (error) => {
  if (error instanceof Error) {
    // handle Error
    const errorMessage = error.message;
    return Promise.reject(errorMessage);
  }
  return Promise.reject(error);
});

export default request;
