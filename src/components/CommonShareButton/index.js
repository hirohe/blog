import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import copy from 'copy-to-clipboard';

class CommonShareButton extends React.PureComponent {
  onShare = () => {
    let { onShareSuccess, onShareReject } = this.props;
    if (typeof onShareSuccess !== 'function') {
      onShareSuccess = () => {};
    }
    if (typeof onShareReject !== 'function') {
      onShareReject = () => {};
    }

    const url = window.location.href;
    const { title, text } = this.props;

    if (navigator.share) {
      // web share api
      const shareData = {
        title,
        text,
        url,
      };
      navigator.share(shareData).then(() => {
        onShareSuccess();
      }).catch(() => {
        onShareReject();
      });
    } else {
      // fallback to copy-paste
      const success = copy(url);
      if (success) {
        alert('已经复制了链接~');
        onShareSuccess();
      } else {
        onShareReject();
      }
    }
  };

  render() {
    return (
      <IconButton onClick={this.onShare}>
        <ShareIcon />
      </IconButton>
    );
  }

}

CommonShareButton.propTypes = {
  onShareSuccess: PropTypes.func,
  onShareReject: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
};

CommonShareButton.defaultProps = {
  onShareSuccess: () => {},
  onShareReject: () => {},
  title: '',
  text: '',
};

export default CommonShareButton;
