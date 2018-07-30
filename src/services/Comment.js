import request from '../utils/request';

const baseUrl = '/api/comment';

export function getComment(id) {
  return request.get(`${baseUrl}/${id}`);
}
