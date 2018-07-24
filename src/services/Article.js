import request from '../utils/request';

const baseUrl = '/api/article';

export function queryArticle(page, pageSize, queryMap) {
  return request.get(`${baseUrl}`, { params: { page, pageSize, queryMap } });
}

export function getArticle(id) {
  return request.get(`${baseUrl}/${id}`);
}
