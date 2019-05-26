import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import { registerLanguage } from './highlightConfig';

class CodeBlock extends React.Component {

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  initHighlight = async language => {
    return registerLanguage(language, hljs);
  };

  highlightCode = () => {
    this.initHighlight(this.props.language).then(() => {
      hljs.highlightBlock(this.codeEl);
    });
  };

  render() {
    return (
      <pre>
        <code ref={el => {this.codeEl = el}} className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    )
  }

}

CodeBlock.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default CodeBlock;
