import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import SimplePagination from '../SimplePagination';

import styles from './CommentList.module.sass';

class CommentList extends React.Component {
  render() {
    const { comments, onReply, onGetRefComment, ...pagination } = this.props;

    return (
      <React.Fragment>
        <div className={styles.commentList}>
          {
            comments ? comments.map(comment => {
              comment.createdAt = new Date(comment.createdAt);
              return comment;
            }).map(comment =>
              <Comment
                key={comment.id}
                comment={comment}
                onReply={onReply}
                onGetRefComment={onGetRefComment}
              />
            ) : null
          }
        </div>
        <div style={{textAlign: 'center'}}>
          <SimplePagination pagination={pagination} />
        </div>
      </React.Fragment>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onReply: PropTypes.func,
  onGetRefComment: PropTypes.func,
};

export default CommentList;
