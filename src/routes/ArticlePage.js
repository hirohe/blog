import React from 'react';
import Article from '../components/Article';
import { CommentList, CommentEditor } from '../components/Comment';
import ErrorContent from '../components/ErrorContent';

import { getArticle, getArticleComments } from '../services/Article';

import styles from './ArticlePage.css';

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

      hasError: false,
      errorMessage: null,
    };
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
    getArticleComments(id, page, pageSize).then(commentPage => {
      const { current, size, records, total } = commentPage;
      this.setState({ comments: { page: current, pageSize: size, total, records } });
    }).catch(() => {
      // TODO
    })
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getArticle(id);
    this.getArticleComments(id);
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

  render() {
    const { article, comments, hasError, errorMessage } = this.state;

    return (
      <React.Fragment>
        {
          hasError ? (
            <ErrorContent content={errorMessage} />
          ) : article ? (
            <React.Fragment>
              <Article article={article} htmlMode="escape" />
              <div className={styles.commentEditor}>
                <CommentEditor />
              </div>
              <CommentList
                comments={comments.records}
                page={comments.page}
                pageSize={comments.pageSize}
                total={comments.total}
                onChange={this.commentListOnChange}
              />
            </React.Fragment>
          ) : null
        }
      </React.Fragment>
    )
  }
}

export default ArticlePage;
