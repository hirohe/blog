import React, { useCallback, useContext, useEffect, useState } from 'react'
import qs from 'qs'
import LayoutContext, { ILayoutContext } from './Layout/LayoutContext'
import { ArticleCardList } from '../components/Article'
import LoadingMask from '../components/LoadingMask'
import { queryArticle } from '../services/Article'
import ErrorContent from '../components/ErrorContent'
import { Page } from '../types/common'
import { Article } from '../types/Article'
import { useNavigate, useSearchParams } from 'react-router-dom'

export interface IndexPageLocationQueryData {
  page: number
  pageSize: number
  labels: string[]
}

export interface IndexPageProps {}

const DefaultQueryData: IndexPageLocationQueryData = {
  page: 1,
  pageSize: 10,
  labels: [],
}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [queryData, setQueryData] = useState<IndexPageLocationQueryData | null>(null)
  const [articlePage, setArticlePage] = useState<Page<Article> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [searchParams] = useSearchParams(undefined)
  const navigate = useNavigate()

  const layoutContext = useContext<ILayoutContext>(LayoutContext)

  const onQueryArticle = useCallback(
    () => {
      if (queryData) {
        const { page, pageSize, labels } = queryData
        setLoading(true)
        queryArticle(page, pageSize, { labels })
          .then((articlePage) => {
            setHasError(false)
            setArticlePage(articlePage)
          })
          .catch((errorMessage) => {
            setHasError(true)
            setErrorMessage(errorMessage ? errorMessage.message : '')
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [queryData],
  );

  useEffect(() => {
    if (searchParams) {
      setQueryData({
        page: Number(searchParams.get('page') || DefaultQueryData.page),
        pageSize: Number(searchParams.get('pageSize') || DefaultQueryData.pageSize),
        labels: searchParams.getAll('labels') || DefaultQueryData.labels,
      })
    }
  }, [searchParams])

  useEffect(() => {
    onQueryArticle()
  }, [onQueryArticle])

  useEffect(() => {
    layoutContext.updateTitle('首页')
  }, [])

  const openArticle = (id: number) => {
    navigate({ pathname: `article/${id}` })
  }

  const onArticleCardListChange = (page: number, pageSize?: number) => {
    // replace pagination data to history
    navigate({ search: qs.stringify({ page, pageSize }) }, { replace: true })
  }

  return (
    <div>
      <LoadingMask loading={loading}>
        {hasError ? (
          <ErrorContent content={errorMessage || ''} />
        ) : articlePage ? (
          <ArticleCardList
            articles={articlePage.records}
            page={articlePage.page}
            pageSize={articlePage.pageSize}
            total={articlePage.total}
            onChange={onArticleCardListChange}
            onOpen={openArticle}
          />
        ) : null}
      </LoadingMask>
    </div>
  )
}

export default IndexPage
