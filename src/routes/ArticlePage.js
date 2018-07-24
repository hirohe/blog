import React from 'react';
import Article from '../components/Article';
import { getArticle } from '../services/Article';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getArticle(id).then(article => {
      this.setState({ article });
    });
  }

  render() {
    const { article } = this.state;

    return (
      <div>
        {
          article ? (
            <Article article={article} htmlMode="escape" />
          ) : null
        }
      </div>
    )
  }
}

export default ArticlePage;
