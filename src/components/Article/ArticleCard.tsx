import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { ArticleInfo } from './Article'

import styles from './ArticleCard.module.sass'
import { Article } from '../../types/Article'

// const _toggleLike = debounce(() => {
//   console.log('toggle like');
// }, 1000);

export interface ArticleCardProps {
  article: Article
  onOpen: () => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => {
  // const [liked, setLiked] = useState<boolean>(false);

  // const toggleLike = () => {
  //   setLiked(!liked);
  //   _toggleLike();
  // };

  const openArticle = () => {
    if (typeof onOpen === 'function') onOpen()
  }

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.cardMedia} image={article.coverUrl} />
      <CardContent>
        <ArticleInfo article={article} />
        <Link href={`/article/${article.id}`}>
          <Typography
            className={styles.title}
            onClick={openArticle}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {article.title}
          </Typography>
        </Link>
        <Typography component="p" className={styles.preview}>
          {article.preview}
        </Typography>
        {article.labels
          ? article.labels
              .split(',')
              .map((label, index) => (
                <Chip
                  key={index}
                  label={'#' + label}
                  className={styles.label}
                />
              ))
          : null}
      </CardContent>
      <CardActions className={styles.cardAction}>
        {/*<div>
            <FavoriteIcon
              className={liked ? styles.liked : styles.likeDefault}
              onClick={this.toggleLike}
            />
            <div className={styles.likes}>{likes}</div>
          </div>*/}
        <Button color="primary" onClick={openArticle}>
          阅读全文
        </Button>
      </CardActions>
    </Card>
  )
}

export default ArticleCard
