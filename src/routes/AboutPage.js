import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { LayoutContext } from './Layout';

import styles from './AboutPage.module.sass';

class AboutPage extends React.Component {
  componentDidMount() {
    const { updateTitle } = this.props.layoutContext;
    updateTitle('关于我');
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.avatarWrapper}>
          <Avatar
            alt="hirohe"
            style={{
              width: 100,
              height: 100,
            }}
            src="https://avatars2.githubusercontent.com/u/14357567?s=400"
          />
        </div>

        <div className={styles.content}>
          <Typography variant="h6" gutterBottom>
            与我联系
          </Typography>

          <Typography>

          </Typography>
        </div>
      </div>
    )
  }
}

export default (props) => {
  return (
    <LayoutContext.Consumer>
      {context => <AboutPage {...props} layoutContext={context} />}
    </LayoutContext.Consumer>
  )
};
