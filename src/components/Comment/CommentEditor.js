import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import delay from 'lodash/delay';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import withTheme from '@material-ui/core/styles/withTheme';
import SendIcon from '@material-ui/icons/Send';
import withWidth from '@material-ui/core/withWidth';

import { LayoutContext } from '../../routes/Layout';
import IdenticonAvatar from '../IdenticonAvatar';
import markdownPng from '../../assets/markdown.png';
import { md5 } from '../../utils/common';

import styles from './CommentEditor.css';

const content_max_length = 1000;

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      name: 'anonymous',
      nameHash: '294de3557d9d00b3d2d8a1e6aab028cf',
      email: '',
      content: '',

      showPreview: false,
      replying: false,
    };
  };

  componentDidUpdate(preProps) {
    const { refId: newRefId } = this.props;
    const { refId: oldRefId } = preProps;
    if (newRefId !== null && newRefId !== oldRefId) {
      this.nameInputEl.focus();
    }
  }

  updateNameHash = debounce(() => {
    const { name } = this.state;
    this.setState({ nameHash: md5(name) });
  }, 500);

  nameOnChange = (e) => {
    const name = e.target.value || 'anonymous';
    this.setState({ name: name.trim() }, this.updateNameHash);
  };

  emailOnChange = (e) => {
    const email = e.target.value;
    this.setState({ email: email.trim() });
  };

  contentOnChange = (e) => {
    const content = e.target.value;
    if (content.length <= content_max_length) this.setState({ content });
  };

  toggleShowPreview = () => {
    const { showPreview } = this.state;
    this.setState({ showPreview: !showPreview });
  };

  onReply = () => {
    const { showMessage } = this.props.layoutContext;
    const { onReply } = this.props;
    if (typeof onReply === 'function') {
      const { refId } = this.props;
      const { name, email, content } = this.state;

      // check
      if (name.length <= 0) {
        showMessage('请输入昵称');
        return;
      }
      if (email.length > 0 && !/.+@.+\..+/.test(email)) {
        showMessage('email不正确');
        return;
      }
      if (content.length <= 0) {
        showMessage('请输入评论');
        return;
      }
      if (content.length > content_max_length) {
        showMessage('评论长度不能超过500');
        return;
      }

      this.setState({ replying: true });
      Promise.all([
        onReply({ refId, name, email, content }),
        new Promise(resolve => delay(resolve, 300))
      ]).then(() => {
        this.setState(this.initialState());
      }).finally(() => {
        this.setState({ replying: false });
      })
    }
  };

  render() {
    const { name, nameHash, content, showPreview, replying } = this.state;
    const { palette: { type: themeType } } = this.props.theme;
    const { refId, onRefIdRemove, width } = this.props;

    let rootClassName = styles.root;
    if (width === 'xs') { // for xs screen
      rootClassName = classnames(styles.root, styles.small)
    }

    return (
      <div className={rootClassName}>
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
              placeholder="anonymous 可选"
              onChange={this.nameOnChange}
              className={styles.field}
              inputRef={el => this.nameInputEl = el}
            />
            <TextField
              label="email"
              placeholder="email 可选"
              onChange={this.emailOnChange}
              className={styles.field}
            />
            {
              refId ?
                <Chip label={`回复 #${refId}`} onDelete={onRefIdRemove} className={styles.refLabel} />
                : null
            }
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
                value={content}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button size="small" color="primary" onClick={this.toggleShowPreview}>
                        预览
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <span className={styles.contentLength}>
                {`${content.length}/${content_max_length}`}
                </span>
              <Tooltip title="发送">
                <Slide in={!replying} direction={replying ? 'left' : 'right'}>
                  <Button
                    variant="fab"
                    color="primary"
                    mini
                    onClick={this.onReply}
                    className={styles.sendBtn}
                  >
                    <SendIcon />
                  </Button>
                </Slide>
              </Tooltip>
              {
                showPreview ? (
                  <Typography component="div" noWrap={false} className={styles.commentContent}>
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

CommentEditor.propTypes = {
  refId: PropTypes.number,
  onRefIdRemove: PropTypes.func,
  onReply: PropTypes.func,
};

export default withWidth()(withTheme()(props =>
  <LayoutContext.Consumer>
    {context => <CommentEditor {...props} layoutContext={context} />}
  </LayoutContext.Consumer>
));
