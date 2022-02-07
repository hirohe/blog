import React, { useState } from 'react'
import dateFormat from 'date-fns/format'
import distanceToNow from 'date-fns/formatDistanceToNow'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import zhLocale from 'date-fns/locale/zh-CN'
import ReactMarkdown from 'react-markdown'
import Popover from '@mui/material/Popover'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import IdenticonAvatar from '../IdenticonAvatar'

import styles from './Comment.module.sass'
import { Comment } from '../../types/Comment'
import useWidth from '../../hooks/useWidth'

export interface CommentProps {
  comment: Comment
  onReply?: (id: number) => void
  onGetRefComment?: (refId: number) => Promise<Comment>
  noReplyBtn?: boolean
  noRefIdLabel?: boolean
}

const anonymousNameHash = 'anonymous'

const CommentComponent: React.FC<CommentProps> = ({
  comment,
  onReply,
  onGetRefComment,
  noReplyBtn = false,
  noRefIdLabel = false,
}) => {
  const width = useWidth()
  const { id, refId, name, nameHash, content, createdAt } = comment

  const [refIdChipEl, setRefIdChipEl] = useState<HTMLElement | null>(null)
  const [openRefPopover, setOpenRefPopover] = useState<boolean>(false)
  const [refComment, setRefComment] = useState<Comment | null>(null)

  const refIdOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setRefIdChipEl(e.currentTarget)
    // chow refId
    if (typeof onGetRefComment === 'function') {
      setOpenRefPopover(false)
      if (refComment === null) {
        onGetRefComment(refId).then((theRefComment) => {
          setRefComment(theRefComment)
        })
      }
    }
  }

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
              {differenceInMinutes(new Date(), createdAt) > 10
                ? dateFormat(createdAt, 'yyyy-MM-dd')
                : distanceToNow(createdAt, { locale: zhLocale }) + ' 前'}
            </span>
            <span className={styles.id}>#{id}</span>
            {!noReplyBtn ? (
              <Button
                color="secondary"
                size="small"
                className={styles.replyBtn}
                onClick={() => onReply && onReply(id)}
              >
                回复
              </Button>
            ) : null}
          </div>
          <div className={styles.content}>
            {!noRefIdLabel ? (
              refId ? (
                <Chip
                  onClick={refIdOnClick}
                  className={styles.refIdLabel}
                  label={`回复 #${refId}`}
                />
              ) : null
            ) : null}
            <Typography
              component="div"
              noWrap={false}
              className={styles.commentContent}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
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
        PaperProps={
          width === 'xs'
            ? {
                style: { width: '100%' },
              }
            : {
                style: { width: '100%', maxWidth: 500 },
              }
        }
      >
        {refComment ? (
          <CommentComponent
            comment={refComment}
            noRefIdLabel={noRefIdLabel}
            noReplyBtn={noReplyBtn}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <CircularProgress size={30} />
          </div>
        )}
      </Popover>
    </Paper>
  )
}

export default CommentComponent
