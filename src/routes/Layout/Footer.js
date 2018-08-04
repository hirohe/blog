import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

import styles from './Footer.scss';

export default function Footer({ author }) {
  return (
    <div className={styles.root}>
      {`© - ${new Date().getFullYear()} ${author}  (^_^)/`}
      <span className={styles.hint}>
        with <FavoriteIcon fontSize="inherit" /> <a href="https://material-ui.com">material-ui</a>
      </span>
    </div>
  );
}
