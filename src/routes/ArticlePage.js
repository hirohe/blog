import React from 'react';
import ReactDOM from 'react-dom';
import { LayoutContext } from './Layout';
import Article from '../components/Article';
import { CommentList, CommentEditor } from '../components/Comment';
import ErrorContent from '../components/ErrorContent';
import SubHeader from '../components/SubHeader';

import { getArticle, getArticleComments, postComment } from '../services/Article';
import { getComment } from '../services/Comment';

import styles from './ArticlePage.module.sass';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      comments: {
        records: [],
        page: 1,
        pageSize: 5,
        total: 0,
      },

      refId: null,

      hasError: false,
      errorMessage: null,
    };
  }

  isCommentListInViewport(offset = 0) {
    if (!this.commentList) return false;
    const top = ReactDOM.findDOMNode(this.commentList).getBoundingClientRect().top;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  getArticle = (id) => {
    getArticle(id).then(article => {
      if (article) {
        article.createdAt = new Date(article.createdAt);
        if (article.updatedAt) article.updatedAt = new Date(article.updatedAt);
        this.setState({ article, hasError: false });
      }
    }).catch(errorMessage => {
      this.setState({ hasError: true, errorMessage });
    });
  };

  getArticleComments = (id, page = 1, pageSize = 5) => {
    const { layoutContext } = this.props;
    getArticleComments(id, page, pageSize).then(commentPage => {
      const { current, size, records, total } = commentPage;
      this.setState({ comments: { page: current, pageSize: size, total, records } });
    }).catch(() => {
      layoutContext.showMessage('获取评论失败！');
    })
  };

  onWindowScroll = () => {
    const { id } = this.props.match.params;
    if (this.isCommentListInViewport()) {
      window.removeEventListener('scroll', this.onWindowScroll);
      this.getArticleComments(id);
    }
  };

  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('文章');

    const { id } = this.props.match.params;
    this.getArticle(id);

    window.addEventListener('scroll', this.onWindowScroll)
  }

  componentDidUpdate(preProps) {
    const { id: newId } = this.props.match.params;
    const { id: oldId } = preProps.match.params;
    if (newId !== null && newId !== oldId) {
      // is new id coming
      this.getArticle(newId);
      this.getArticleComments(newId);
    }
  }

  commentListOnChange = (page, pageSize) => {
    const { id } = this.props.match.params;
    this.getArticleComments(id, page, pageSize);
  };

  onReply = (id) => {
    if (id) this.setState({ refId: id });
    ReactDOM.findDOMNode(this.commentEditor).scrollIntoView();
    // offset
    window.scrollBy(0, -50);
  };

  onGetRefComment = (refId) => {
    return getComment(refId).then(refComment => {
      refComment.createdAt = new Date(refComment.createdAt);
      return refComment;
    });
  };

  onRefIdRemove = () => {
    this.setState({ refId: null });
  };

  onReplyArticle = (comment) => {
    const { id } = this.props.match.params;
    const { layoutContext } = this.props;
    return postComment(id, comment).then(() => {
      layoutContext.showMessage('发送成功');
      this.getArticleComments(id);
    }).catch(() => {

    });
  };

  render() {
    const {
      article,
      comments,

      hasError,
      errorMessage,

      refId,
    } = this.state;

    return (
      <React.Fragment>
        {
          hasError ? (
            <ErrorContent content={errorMessage} />
          ) : article ? (
            <div className={styles.content}>
              <Article
                article={article}
                htmlMode="escape"
                onReply={this.onReply}
              />
              <SubHeader>评论</SubHeader>
              <div className={styles.commentEditor}>
                <CommentEditor
                  ref={el => this.commentEditor = el}
                  refId={refId}
                  onRefIdRemove={this.onRefIdRemove}
                  onReply={this.onReplyArticle}
                />
              </div>

              <SubHeader>评论列表 {comments.total ? comments.total : 0} 条</SubHeader>
              <CommentList
                ref={el => this.commentList = el}
                comments={comments.records}
                page={comments.page}
                pageSize={comments.pageSize}
                total={comments.total}
                onChange={this.commentListOnChange}
                onReply={this.onReply}
                onGetRefComment={this.onGetRefComment}
              />
            </div>
          ) : null
        }
      </React.Fragment>
    )
  }
}

export default (props) => {
  return (
    <LayoutContext.Consumer>
      {context => <ArticlePage {...props} layoutContext={context} />}
    </LayoutContext.Consumer>
  )
};
