import React from 'react';
import qs from 'qs';
import { LayoutContext } from './Layout';
import { ArticleCardList } from '../components/Article';
import LoadingMask from '../components/LoadingMask';
import { queryArticle } from '../services/Article';
import ErrorContent from '../components/ErrorContent';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingArticles: false,
      articleList: {
        records: [],
        page: 1,
        pageSize: 10,
        total: 0,

        hasError: false,
        errorMessage: null,
      },
    };
  }

  openArticle = (id) => {
    const { history } = this.props;
    history.push({ pathname: `article/${id}` });
  };

  handleLocation = (location) => {
    // get page, pageSize from search
    const { search } = location;
    // TODO labels, category
    let { page, pageSize, labels } = qs.parse(search.replace('?', ''));

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    return { page, pageSize, labels };
  };

  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('首页');

    // check search on location first
    const { page, pageSize, labels } = this.handleLocation(this.props.location);
    this.queryArticle(page, pageSize, labels);
  }

  componentDidUpdate(preProps) {
    const { page: oldPage, pageSize: oldPageSize } = this.handleLocation(preProps.location);
    const { page: newPage, pageSize: newPageSize } = this.handleLocation(this.props.location);
    if (oldPage !== newPage || oldPageSize !== newPageSize) {
      // get new page
      this.queryArticle(newPage, newPageSize);
      // back to top
      window.scrollTo(0, 0);
    }
  }

  queryArticle = (page, pageSize, labels) => {
    this.setState({ loadingArticles: true });
    queryArticle(page, pageSize, { labels }).then(articlePage => {
      const { current, size, records, total } = articlePage;
      this.setState({ articleList: { page: current, pageSize: size, records, total } });
    }).catch(errorMessage => {
      this.setState({ hasError: true, errorMessage });
    }).finally(() => {
      this.setState({ loadingArticles: false });
    })
  };

  articleCardListOnChange = (page, pageSize) => {
    const { history } = this.props;
    // replace pagination data to history
    history.replace({ search: qs.stringify({ page, pageSize }) });
  };

  render() {
    const {
      articleList,
      loadingArticles,

      hasError,
      errorMessage,
    } = this.state;

    return (
      <div>
        <LoadingMask loading={loadingArticles}>
          {
            hasError ? (
              <ErrorContent content={errorMessage} />
            ) : (
              <ArticleCardList
                articles={articleList.records}
                page={articleList.page}
                pageSize={articleList.pageSize}
                total={articleList.total}
                onChange={this.articleCardListOnChange}
                onOpen={this.openArticle}
              />
            )
          }
        </LoadingMask>
      </div>
    )
  }

}

export default (props) => {
  return (
    <LayoutContext.Consumer>
      {context => <IndexPage {...props} layoutContext={context} />}
    </LayoutContext.Consumer>
  )
};
