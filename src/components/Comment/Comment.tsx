import React, {useState} from 'react';
import dateFormat from 'date-fns/format';
import distanceToNow from 'date-fns/formatDistanceToNow';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import zhLocale from 'date-fns/locale/zh-CN';
import ReactMarkdown from 'react-markdown';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withWidth, {WithWidth} from '@material-ui/core/withWidth';

import IdenticonAvatar from '../IdenticonAvatar';

import styles from './Comment.module.sass';
import {Comment} from "../../types/Comment";
import {md5} from "../../utils/common";

export interface CommentProps extends WithWidth {
  comment: Comment;
  onReply?: (id: number) => void,
  onGetRefComment?: (refId: number) => Promise<Comment>,
  noReplyBtn?: boolean,
  noRefIdLabel?: boolean,
}

const anonymousNameHash = md5('anonymous');

const CommentComponent: React.FC<CommentProps> = ({ comment, onReply, onGetRefComment, noReplyBtn = false, noRefIdLabel = false, width = 'xs' }) => {
  const {
    id,
    refId,
    name,
    nameHash,
    content,
    createdAt,
  } = comment;

  const [refIdChipEl, setRefIdChipEl] = useState<HTMLElement | null>(null);
  const [openRefPopover, setOpenRefPopover] = useState<boolean>(false);
  const [refComment, setRefComment] = useState<Comment | null>(null);

  const refIdOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setRefIdChipEl(e.currentTarget);
    // chow refId
    if (typeof onGetRefComment === 'function') {
      setOpenRefPopover(false);
      if (refComment === null) {
        onGetRefComment(refId).then(theRefComment => {
          setRefComment(theRefComment);
        });
      }
    }
  };

  return (
    <Paper className={styles.comment}>
      <Grid container>
        <Grid item className={styles.avatar} sm={1} xs={2}>
          <IdenticonAvatar name={name} hash={nameHash || anonymousNameHash} />
        </Grid>
        <Grid item sm={11} xs={10}>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.createdAt}>
                {
                  differenceInMinutes(new Date(), createdAt) > 10 ?
                    dateFormat(createdAt, 'yyyy-MM-dd') :
                    distanceToNow(createdAt, { locale: zhLocale }) + ' 前'
                }
              </span>
            <span className={styles.id}>#{id}</span>
            {
              !Boolean(noReplyBtn) ? (
                <Button
                  color="secondary"
                  size="small"
                  className={styles.replyBtn}
                  onClick={() => onReply && onReply(id)}
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
                  onClick={refIdOnClick}
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
        onClose={() => setOpenRefPopover(false)}
        anchorEl={refIdChipEl}
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
            <CommentComponent comment={refComment} noRefIdLabel={noRefIdLabel} noReplyBtn={noReplyBtn} width={width} />
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <CircularProgress size={30} />
            </div>
          )
        }
      </Popover>
    </Paper>
  )
};

export default withWidth()(CommentComponent);
