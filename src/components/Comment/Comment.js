import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'date-fns/format';
import distanceToNow from 'date-fns/distance_in_words_to_now';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import zhLocale from 'date-fns/locale/zh_cn';
import ReactMarkdown from 'react-markdown';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

import IdenticonAvatar from '../IdenticonAvatar';

import styles from './Comment.css';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refComment: null,
      openRefPopover: false,
    };
  }

  refIdOnClick = (e) => {
    this.refIdChipEl = e.target;
    // chow refId
    const { comment: { refId }, onGetRefComment } = this.props;
    if (typeof onGetRefComment === 'function') {
      this.setState({ openRefPopover: true });
      if (this.state.refComment === null) {
        onGetRefComment(refId).then(refComment => {
          this.setState({ refComment });
        });
      }
    }
  };

  render() {
    const {
      comment: {
        id,
        articleId,
        refId,
        name,
        nameHash,
        content,
        createdAt,
      },
      onReply,
      width,

      noReplyBtn,
      noRefIdLabel,
    } = this.props;

    const { refComment, openRefPopover } = this.state;

    return (
      <Paper className={styles.comment}>
        <Grid container>
          <Grid item className={styles.avatar} sm={1} xs={2}>
            <IdenticonAvatar name={name} hash={nameHash} />
          </Grid>
          <Grid item sm={11} xs={10}>
            <div className={styles.info}>
              <span className={styles.name}>{name}</span>
              <span className={styles.createdAt}>
                {
                  differenceInMinutes(new Date(), createdAt) > 10 ?
                  dateFormat(createdAt, 'YYYY-MM-DD') :
                  distanceToNow(createdAt, { locale: zhLocale }) + ' 前'
                }
              </span>
              <span className={styles.id}>
                #{id}
              </span>

              {
                !Boolean(noReplyBtn) ? (
                  <Button
                    color="secondary"
                    size="small"
                    className={styles.replyBtn}
                    onClick={()=>{onReply(id)}}
                  >
                    回复
                  </Button>
                ) : null
              }
            </div>
            <div className={styles.content}>
              {
                !Boolean(noRefIdLabel) ? refId ? (
                  <Chip
                    onClick={this.refIdOnClick}
                    className={styles.refIdLabel}
                    label={`回复 #${refId}`}
                  />
                ) : null : null
              }
              <Typography component="div" noWrap={false} className={styles.commentContent}>
                <ReactMarkdown source={content} />
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Popover
          open={openRefPopover}
          onClose={() => this.setState({ openRefPopover: false })}
          anchorEl={this.refIdChipEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          PaperProps={width === 'xs' ? {
            style: { width: '100%' },
          } : {
            style: { width: '100%', maxWidth: 500 }
          }}
        >
          {
            refComment ? (
              <Comment comment={refComment} noRefIdLabel noReplyBtn />
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <CircularProgress size={30} />
              </div>
            )
          }
        </Popover>
      </Paper>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    refId: PropTypes.number,
    name: PropTypes.string,
    nameHash: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
  onReply: PropTypes.func,
  onGetRefComment: PropTypes.func,

  noReplyBtn: PropTypes.bool,
  noRefIdLabel: PropTypes.bool,
};

export default withWidth()(Comment);
