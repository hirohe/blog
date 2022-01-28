import request from './request'
import {
  Article,
  articleFromResponseData,
  ArticleResponseData,
} from '../types/Article'
import {
  Comment,
  commentFromResponseData,
  CommentResponseData,
} from '../types/Comment'
import { Page, pageFromResponseData, PageResponseData } from '../types/common'
import { OnReplyComment } from '../components/Comment/CommentEditor'

const articleUrl = '/article'

export function queryArticle(
  page: number,
  pageSize: number,
  queryMap: any
): Promise<Page<Article>> {
  return request
    .get<PageResponseData<ArticleResponseData>>(`${articleUrl}`, {
      params: { page, pageSize, ...queryMap },
    })
    .then((response) =>
      pageFromResponseData<Article, ArticleResponseData>(
        response.data,
        (data) => articleFromResponseData(data)
      )
    )
}

export function fetchArticle(id: string | number): Promise<Article> {
  return request
    .get<ArticleResponseData>(`${articleUrl}/${id}`)
    .then((response) => articleFromResponseData(response.data))
}

export function fetchArticleComments(
  id: number,
  page: number,
  pageSize: number
): Promise<Page<Comment>> {
  return request
    .get<PageResponseData<CommentResponseData>>(
      `${articleUrl}/${id}/comments`,
      { params: { page, pageSize } }
    )
    .then((response) =>
      pageFromResponseData<Comment, CommentResponseData>(
        response.data,
        commentFromResponseData
      )
    )
}

export function postComment(
  articleId: number | string,
  comment: OnReplyComment
): Promise<boolean> {
  return request
    .post(`${articleUrl}/${articleId}/comment`, comment)
    .then(() => true)
    .catch(() => false)
}
