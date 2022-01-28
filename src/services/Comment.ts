import request from './request'
import {
  Comment,
  commentFromResponseData,
  CommentResponseData,
} from '../types/Comment'

const commentUrl = '/comment'

export function fetchComment(id: number): Promise<Comment> {
  return request
    .get<CommentResponseData>(`${commentUrl}/${id}`)
    .then((response) => commentFromResponseData(response.data))
}
