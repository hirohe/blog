import FetchRequest from '@hirohe/fetch-request';

const request = new FetchRequest();
request.setupResponseInterceptor((response) => {
  if (response.data) {
    if (response.data.success) {
      return response.data.data;
    }
    return Promise.reject(response.data.message)
  }
});

export default request;
