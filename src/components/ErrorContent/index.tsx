import React from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import Typography from '@mui/material/Typography'

export interface ErrorContentProps {
  content: string
}

const ErrorContent: React.FC<ErrorContentProps> = ({ content }) => {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <ErrorIcon fontSize="inherit" style={{ fontSize: 128, color: 'gray' }} />
      <Typography component="p">
        {content ? content : '好像什么地方出错了 Σ(ﾟДﾟ)'}
      </Typography>
    </div>
  )
}

export default ErrorContent
