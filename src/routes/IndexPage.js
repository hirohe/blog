import React from 'react';
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

  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('首页');

    const { articleList: { page, pageSize } } = this.state;

    this.queryArticle(page, pageSize);
  }

  queryArticle = (page, pageSize) => {
    queryArticle(page, pageSize).then(articlePage => {
      const { current, size, records, total } = articlePage;
      this.setState({ articleList: { page: current, pageSize: size, records, total } });
    }).catch(message => {

    });
  };

  articleCardListOnChange = (page, pageSize) => {
    this.queryArticle(page, pageSize);
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
