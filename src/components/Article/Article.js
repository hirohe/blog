import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
/* custom renderers */
import CodeBlock from './MarkdownRenders/CodeBlock';
import BlockQuote from './MarkdownRenders/BlockQuote';

import styles from './Article.css';

const renderers = {
  ...ReactMarkdown.renderers,
  code: CodeBlock,
  blockquote: BlockQuote,
};

class Article extends React.Component {

  render() {
    const { article, htmlMode } = this.props;

    return (
      <div className={styles.article}>
        {
          article ? (
            <div className={styles.content}>
              {/* TODO title */}
              {/* TODO cover */}
              <ReactMarkdown
                source={article.content}
                skipHtml={htmlMode === 'skip'}
                escapeHtml={htmlMode === 'escape'}
                renderers={renderers}
              />
            </div>
          ) : null
        }
      </div>
    )
  }

}

Article.propTypes = {
  htmlMode: PropTypes.oneOf(['skip', 'escape']),
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    coverUrl: PropTypes.string,
    content: PropTypes.string,
    labels: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
};

export default Article;
