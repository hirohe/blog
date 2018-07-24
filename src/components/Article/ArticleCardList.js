import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import SimplePagination from '../SimplePagination';

import styles from './ArticleCardList.css';

class ArticleCardList extends React.Component {
  openArticle = (id) => {
    const { onOpen } = this.props;
    if (typeof onOpen === 'function') onOpen(id);
  };

  render() {
    const { articles, ...pagination } = this.props;

    return (
      <div>
        <div className={styles.cardList}>
          {
            articles ? articles.map(article =>
              <ArticleCard
                key={article.id}
                title={article.title}
                coverUrl={article.coverUrl}
                preview={article.preview}
                category={article.category}
                labels={article.labels}
                likes={article.likes}
                createdAt={new Date(article.createdAt)}
                updatedAt={article.updatedAt ? new Date(article.updatedAt) : null}
                onOpen={() => this.openArticle(article.id)}
              />
            ) : null
          }
        </div>
        <div style={{textAlign: 'center'}}>
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
