import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'

import styles from './Footer.module.sass'

export interface FooterProps {
  author: string
}

const Footer: React.FC<FooterProps> = ({ author }) => {
  return (
    <div className={styles.root}>
      {`© - ${new Date().getFullYear()} ${author}  (^_^)/`}
      <span className={styles.hint}>
        build with <FavoriteIcon fontSize="inherit" />{' '}
        <a href="https://material-ui.com">material-ui</a>
      </span>
    </div>
  )
}

export default Footer
