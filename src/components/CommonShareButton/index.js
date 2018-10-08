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

    if (navigator.share) {
      // web share api
      const shareData = {
        title: 'test',
        text: 'test page',
        url: 'https://blog.hirohe.me',
      };
      navigator.share(shareData).then(() => {
        onShareSuccess();
      }).catch(() => {
        onShareReject();
      });
    } else {
      // fallback to copy-paste
      const text = `...`;
      const success = copy(text);
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
};

export default CommonShareButton;
