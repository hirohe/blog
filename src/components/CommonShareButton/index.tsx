import React from 'react';
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import copy from 'copy-to-clipboard';

export interface CommonShareButtonProps {
  onShareSuccess: () => void;
  onShareReject: () => void;
  title?: string;
  text?: string;
}

const CommonShareButton: React.FC<CommonShareButtonProps> = ({ onShareSuccess, onShareReject, title = '', text = '' }) => {
  const onShare = () => {
    if (typeof onShareSuccess !== 'function') {
      onShareSuccess = () => {};
    }
    if (typeof onShareReject !== 'function') {
      onShareReject = () => {};
    }

    const url = window.location.href;

    // @ts-ignore
    if (window.navigator.share) {
      // web share api
      const shareData = {
        title,
        text,
        url,
      };
      // @ts-ignore
      window.navigator.share(shareData).then(() => {
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

  return (
    <IconButton onClick={onShare}>
      <ShareIcon />
    </IconButton>
  );
};

export default CommonShareButton;
