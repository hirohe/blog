import React from 'react'
import ArticleCard from './ArticleCard'
import SimplePagination from '../SimplePagination'

import styles from './ArticleCardList.module.sass'
import { Article } from '../../types/Article'
import { PaginationProps } from '../../types/common'

export interface ArticleCardListProps extends PaginationProps {
  articles: Article[]
  onOpen: (id: number) => void
}

const ArticleCardList: React.FC<ArticleCardListProps> = ({
  articles,
  onOpen,
  children,
  ...pagination
}) => {
  const openArticle = (id: number) => {
    if (typeof onOpen === 'function') onOpen(id)
  }

  return (
    <div>
      <div className={styles.cardList}>
        {articles
          ? articles
              .map((article) => {
                article.createdAt = new Date(article.createdAt)
                if (article.updatedAt)
                  article.updatedAt = new Date(article.updatedAt)
                return article
              })
              .map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpen={() => openArticle(article.id)}
                />
              ))
          : null}
      </div>
      <div className={styles.paginationWrapper}>
        <SimplePagination {...pagination} />
      </div>
    </div>
  )
}

export default ArticleCardList
