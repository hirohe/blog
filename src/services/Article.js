import request from '../utils/request';

const baseUrl = '/api/article';

export function queryArticle(page, pageSize, queryMap) {
  return request.get(`${baseUrl}`, { params: { page, pageSize, ...queryMap } });
}

export function getArticle(id) {
  return request.get(`${baseUrl}/${id}`);
}

export function getArticleComments(id, page, pageSize) {
  return request.get(`${baseUrl}/${id}/comments`, { params: { page, pageSize } });
}

export function postComment(articleId, comment) {
  return request.post(`${baseUrl}/${articleId}/comment`, comment);
}