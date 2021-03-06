import React, {useCallback, useContext, useEffect, useState} from 'react';
import qs from 'qs';
import LayoutContext, {ILayoutContext} from './Layout/LayoutContext';
import { ArticleCardList } from '../components/Article';
import LoadingMask from '../components/LoadingMask';
import { queryArticle } from '../services/Article';
import ErrorContent from '../components/ErrorContent';
import { RouteComponentProps } from "react-router-dom";
import {Page} from "../types/common";
import {Article} from "../types/Article";
import {Location} from "history";

export interface IndexPageLocationQueryData {
  page: number;
  pageSize: number;
  labels: string[];
}

export interface IndexPageProps {

}

const IndexPage: React.FC<RouteComponentProps<IndexPageProps>> = ({ history, location }) => {
  const [articlePage, setArticlePage] = useState<Page<Article> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const layoutContext = useContext<ILayoutContext>(LayoutContext);

  useEffect(() => {
    layoutContext.updateTitle('首页');
  }, []);

  useEffect(() => {
    const queryData = handleLocation(location);
    onQueryArticle(queryData);
  }, [location.search, useCallback]);

  const openArticle = (id: number) => {
    history.push({ pathname: `article/${id}` });
  };

  const handleLocation = useCallback((location: Location): IndexPageLocationQueryData => {
    // get page, pageSize from search
    const { search } = location;
    // TODO labels, category
    let { page, pageSize, labels } = qs.parse(search.replace('?', ''));

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    return { page, pageSize, labels };
  }, [location]);

  const onQueryArticle = (queryData: IndexPageLocationQueryData) => {
    const { page, pageSize, labels } = queryData;
    setLoading(true);
    queryArticle(page, pageSize, { labels }).then(articlePage => {
      setHasError(false);
      setArticlePage(articlePage);
    }).catch(errorMessage => {
      setHasError(true);
      setErrorMessage(errorMessage ? errorMessage.message : '');
    }).finally(() => {
      setLoading(false);
    })
  };

  const onArticleCardListChange = (page: number, pageSize?: number) => {
    // replace pagination data to history
    history.replace({ search: qs.stringify({ page, pageSize }) });
  };

  return (
    <div>
      <LoadingMask loading={loading}>
        {
          hasError ? (
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
          ) : null
        }
      </LoadingMask>
    </div>
  )
};

export default IndexPage;
