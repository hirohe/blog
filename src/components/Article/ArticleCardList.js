import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import SimplePagination from '../SimplePagination';

import styles from './ArticleCardList.module.sass';

class ArticleCardList extends React.Component {
  openArticle = (id) => {
    const { onOpen } = this.props;
    if (typeof onOpen === 'function') onOpen(id);
  };

  render() {
    const { articles, onOpen, ...pagination } = this.props;

    return (
      <div>
        <div className={styles.cardList}>
          {
            articles ? articles.map(article => {
              article.createdAt = new Date(article.createdAt);
              if (article.updatedAt) article.updatedAt = new Date(article.updatedAt);
              return article;
            }).map(article =>
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={() => this.openArticle(article.id)}
              />
            ) : null
          }
        </div>
        <div className={styles.paginationWrapper}>
          <SimplePagination pagination={pagination} />
        </div>
      </div>
    )
  }
}

ArticleCardList.propTypes = {
  articles: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
};

export default ArticleCardList;
