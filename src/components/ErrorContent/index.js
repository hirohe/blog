import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';

const rootStyle = {
  textAlign: 'center',
  padding: 32,
};

const errorIconStyle = {
  fontSize: 128,
  color: 'gray',
};

class ErrorContent extends React.PureComponent {
  render() {
    const { content } = this.props;

    return (
      <div style={rootStyle}>
        <ErrorIcon fontSize="inherit" style={errorIconStyle} />
        <Typography component="p">
          {content ? content : '好像什么地方出错了 Σ(ﾟДﾟ)'}
        </Typography>
      </div>
    )
  }
}

ErrorContent.propTypes = {
  content: PropTypes.any,
};

export default ErrorContent;
