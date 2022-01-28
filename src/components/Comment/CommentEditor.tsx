import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import debounce from 'lodash/debounce'
import delay from 'lodash/delay'
import ReactMarkdown from 'react-markdown'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import SendButton from './SendButton'
import IdenticonAvatar from '../IdenticonAvatar'
import markdownPng from '../../assets/markdown.png'

import styles from './CommentEditor.module.sass'
import { useSnackbar } from 'notistack'
import useWidth from '../../hooks/useWidth'
import { useTheme } from '@mui/material/styles'

const content_max_length = 1000

export interface CommentEditorState {
  name: string
  nameHash: string
  email: string
  content: string
  showPreview: boolean
  replying: boolean
}

export type OnReplyComment = {
  refId?: number | null
  name: string
  email: string
  content: string
}

function initialState(): CommentEditorState {
  return {
    name: 'anonymous',
    nameHash: '294de3557d9d00b3d2d8a1e6aab028cf',
    email: '',
    content: '',
    showPreview: false,
    replying: false,
  }
}

export interface CommentEditorProps {
  refId: number | null
  onRefIdRemove: (id: number) => void
  onReplySend: (comment: OnReplyComment) => Promise<void>
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  refId,
  onRefIdRemove,
  onReplySend,
}) => {
  const theme = useTheme()
  const width = useWidth()
  const [state, setState] = useState<CommentEditorState>(initialState())

  const nameInputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (nameInputEl && nameInputEl.current && refId) nameInputEl.current.focus()
  }, [refId])

  const { enqueueSnackbar } = useSnackbar()

  const updateNameHash = debounce(() => {
    setState({ ...state, nameHash: state.name })
  }, 500)

  const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim() || 'anonymous'
    setState({ ...state, name: name })
    updateNameHash()
  }

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setState({ ...state, email: email.trim() })
  }

  const contentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value
    if (content.length <= content_max_length) setState({ ...state, content })
  }

  const toggleShowPreview = () => {
    const { showPreview } = state
    setState({ ...state, showPreview: !showPreview })
  }

  const onReplyClick = async () => {
    if (typeof onReplySend === 'function') {
      const { name, email, content } = state

      // check
      if (name.length <= 2) {
        enqueueSnackbar('请输入昵称')
        return false
      }
      if (email.length > 0 && !/.+@.+\..+/.test(email)) {
        enqueueSnackbar('email不正确')
        return false
      }
      if (content.length <= 0) {
        enqueueSnackbar('请输入评论')
        return false
      }
      if (content.length > content_max_length) {
        enqueueSnackbar('评论长度不能超过500')
        return false
      }

      setState({ ...state, replying: true })
      Promise.all([
        onReplySend({ refId, name, email, content }),
        new Promise((resolve) => delay(resolve, 300)),
      ])
        .then(() => {
          setState(initialState())
        })
        .finally(() => {
          setState({ ...state, replying: false })
        })

      return true
    }

    return false
  }

  const { name, nameHash, content, showPreview, replying } = state
  const {
    palette: { mode: themeType },
  } = theme

  let rootClassName = styles.root
  if (width === 'xs') {
    // for xs screen
    rootClassName = clsx(styles.root, styles.small)
  }

  return (
    <div className={rootClassName}>
      <div className={styles.avatar}>
        <IdenticonAvatar name={name} hash={nameHash} />
      </div>
      <div className={styles.editor}>
        <div
          className={
            themeType === 'dark'
              ? clsx(styles.arrow, styles.dark)
              : styles.arrow
          }
        />
        <Paper className={styles.editorPaper}>
          <Grid container>
            <Grid item xs>
              <TextField
                label="昵称"
                variant="standard"
                placeholder="anonymous 可选"
                onChange={nameOnChange}
                className={styles.field}
                inputRef={nameInputEl}
              />
              <TextField
                label="email"
                variant="standard"
                placeholder="email 可选"
                onChange={emailOnChange}
                className={styles.field}
              />
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <span className={styles.markdownHint}>支持Markdown</span>
                <img
                  className={styles.markdownLogo}
                  src={markdownPng}
                  alt="markdown"
                />
              </Grid>
              {refId ? (
                <Chip
                  label={`回复 #${refId}`}
                  onDelete={onRefIdRemove}
                  className={styles.refLabel}
                />
              ) : null}
            </Grid>
          </Grid>
          <div>
            <TextField
              label="评论"
              variant="standard"
              multiline
              fullWidth
              maxRows={10}
              placeholder="say something..."
              margin="normal"
              onChange={contentOnChange}
              value={content}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      color="primary"
                      onClick={toggleShowPreview}
                    >
                      预览
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <span className={styles.contentLength}>
              {`${content.length}/${content_max_length}`}
            </span>
            <SendButton onSend={onReplyClick} sending={replying} />
            {showPreview ? (
              <Typography
                component="div"
                noWrap={false}
                className={styles.commentContent}
              >
                <ReactMarkdown children={content} />
              </Typography>
            ) : null}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default CommentEditor
