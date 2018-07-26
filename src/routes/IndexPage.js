import React from 'react';
import qs from 'qs';
import { LayoutContext } from './Layout';
import { ArticleCardList } from '../components/Article';
import { queryArticle } from '../services/Article';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: {
        records: [],
        page: 1,
        pageSize: 10,
        total: 0,
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
    let { page, pageSize } = qs.parse(search.replace('?', ''));

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    return { page, pageSize };
  };

  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('首页');

    // check search on location first
    const { page, pageSize } = this.handleLocation(this.props.location);
    this.queryArticle(page, pageSize);
  }

  componentDidUpdate(preProps) {
    const { page: oldPage, pageSize: oldPageSize } = this.handleLocation(preProps.location);
    const { page: newPage, pageSize: newPageSize } = this.handleLocation(this.props.location);
    console.log(oldPage, newPage);
    if (oldPage !== newPage || oldPageSize !== newPageSize) {
      // get new page
      this.queryArticle(newPage, newPageSize);
    }
  }

  queryArticle = (page, pageSize) => {
    queryArticle(page, pageSize).then(articlePage => {
      const { current, size, records, total } = articlePage;
      this.setState({ articleList: { page: current, pageSize: size, records, total } });
    }).catch(message => {
      // TODO
    });
  };

  articleCardListOnChange = (page, pageSize) => {
    const { history } = this.props;
    // replace pagination data to history
    history.replace({ search: qs.stringify({ page, pageSize }) });
  };

  render() {
    const { articleList } = this.state;

    return (
      <div>
        <ArticleCardList
          articles={articleList.records}
          page={articleList.page}
          pageSize={articleList.pageSize}
          total={articleList.total}
          onChange={this.articleCardListOnChange}
          onOpen={this.openArticle}
        />
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
