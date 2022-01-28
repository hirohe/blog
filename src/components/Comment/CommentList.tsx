import React from 'react'
import CommentComponent from './Comment'
import SimplePagination from '../SimplePagination'

import styles from './CommentList.module.sass'
import { Comment } from '../../types/Comment'
import { PaginationProps } from '../../types/common'

export interface CommentListProps extends PaginationProps {
  comments: Comment[]
  onReply: (id: number) => void
  onGetRefComment: (refId: number) => Promise<Comment>
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  onGetRefComment,
  children,
  ...pagination
}) => {
  return (
    <React.Fragment>
      <div className={styles.commentList}>
        {comments
          ? comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                onReply={onReply}
                onGetRefComment={onGetRefComment}
              />
            ))
          : null}
      </div>
      <div style={{ textAlign: 'center' }}>
        <SimplePagination {...pagination} />
      </div>
    </React.Fragment>
  )
}

export default CommentList
