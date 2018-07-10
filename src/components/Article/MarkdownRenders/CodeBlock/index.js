import React from 'react';
import PropTypes from 'prop-types';

//hightlight css
import 'highlightjs/styles/monokai-sublime.css';
const hljs = require('highlightjs');

class CodeBlock extends React.Component {

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode = () => {
    hljs.highlightBlock(this.codeEl);
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
