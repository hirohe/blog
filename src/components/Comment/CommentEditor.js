import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import withTheme from '@material-ui/core/styles/withTheme';

import IdenticonAvatar from '../IdenticonAvatar';
import markdownPng from '../../assets/markdown.png';
import { md5 } from '../../utils/common';

import styles from './CommentEditor.css';

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'anonymous',
      nameHash: '294de3557d9d00b3d2d8a1e6aab028cf',
      email: '',
      content: '',

      showPreview: false,
    };
  }

  updateNameHash = debounce(() => {
    const { name } = this.state;
    this.setState({ nameHash: md5(name) });
  }, 500);

  nameOnChange = (e) => {
    const name = e.target.value || 'anonymous';
    this.setState({ name }, this.updateNameHash);
  };

  emailOnChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };

  contentOnChange = (e) => {
    const content = e.target.value;
    this.setState({ content });
  };

  toggleShowPreview = () => {
    const { showPreview } = this.state;
    this.setState({ showPreview: !showPreview });
  };

  render() {
    const { name, nameHash, content, showPreview } = this.state;
    const { palette: { type: themeType } } = this.props.theme;

    return (
      <div className={styles.root}>
        <div className={styles.avatar}>
          <IdenticonAvatar name={name} hash={nameHash} />
        </div>
        <div className={styles.editor}>
          <div
            className={themeType === 'dark' ? classnames(styles.arrow, styles.dark) : styles.arrow}
          />
          <Paper className={styles.editorPaper}>
            <img className={styles.markdownLogo} src={markdownPng} alt="markdown" />
            <TextField
              label="昵称"
              placeholder="anonymous"
              onChange={this.nameOnChange}
              className={styles.field}
            />
            <TextField
              label="email"
              placeholder="email"
              onChange={this.emailOnChange}
              className={styles.field}
            />
            <div>
              <TextField
                label="评论"
                multiline
                rows={1}
                fullWidth
                rowsMax={5}
                placeholder="say something..."
                margin="normal"
                onChange={this.contentOnChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button size="small" color="primary" onClick={this.toggleShowPreview}>
                        预览
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
              {
                showPreview ? (
                  <Typography noWrap={false}>
                    <ReactMarkdown source={content} />
                  </Typography>
                ) : null
              }
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

export default withTheme()(CommentEditor);
