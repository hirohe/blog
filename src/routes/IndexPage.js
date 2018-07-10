import React from 'react';

import { LayoutContext } from './Layout';
import { Article } from '../components/Article';

class IndexPage extends React.Component {

  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('首页')
  }

  render() {
    return (
      <div>
        <Article
          content={`# hello\n\`\`\`js\nconst a = 'hello'\n\`\`\``}
          htmlMode="escape"
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
