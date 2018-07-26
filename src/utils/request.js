import FetchRequest from '@hirohe/fetch-request';

const request = new FetchRequest();
request.setupResponseInterceptor((response) => {
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
