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
    const { content, htmlMode } = this.props;

    const theContent = content || '';

    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <ReactMarkdown
            source={theContent}
            skipHtml={htmlMode === 'skip'}
            escapeHtml={htmlMode === 'escape'}
            renderers={renderers}
          />
        </div>
      </div>
    )
  }

}

Article.propTypes = {
  content: PropTypes.string,
  htmlMode: PropTypes.oneOf(['skip', 'escape']),
};

export default Article;
