import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';

export interface ErrorContentProps {
  content: string;
}

const ErrorContent: React.FC<ErrorContentProps> = ({ content }) => {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <ErrorIcon fontSize="inherit" style={{ fontSize: 128, color: 'gray' }}/>
      <Typography component="p">
        {content ? content : '好像什么地方出错了 Σ(ﾟДﾟ)'}
      </Typography>
    </div>
  )
};

export default ErrorContent;
