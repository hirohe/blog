import React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import IconButton from '@mui/material/IconButton'
import copy from 'copy-to-clipboard'

export interface CommonShareButtonProps {
  onShareSuccess: () => void
  onShareReject: () => void
  title?: string
  text?: string
}

const CommonShareButton: React.FC<CommonShareButtonProps> = ({
  onShareSuccess,
  onShareReject,
  title = '',
  text = '',
}) => {
  const onShare = () => {
    if (typeof onShareSuccess !== 'function') {
      onShareSuccess = () => {}
    }
    if (typeof onShareReject !== 'function') {
      onShareReject = () => {}
    }

    const url = window.location.href

    if (window.navigator.share) {
      // web share api
      const shareData = {
        title,
        text,
        url,
      }
      window.navigator
        .share(shareData)
        .then(() => {
          onShareSuccess()
        })
        .catch(() => {
          onShareReject()
        })
    } else {
      // fallback to copy-paste
      const success = copy(url)
      if (success) {
        alert('已经复制了链接~')
        onShareSuccess()
      } else {
        onShareReject()
      }
    }
  }

  return (
    <IconButton onClick={onShare}>
      <ShareIcon />
    </IconButton>
  )
}

export default CommonShareButton
