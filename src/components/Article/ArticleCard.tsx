import React, {useState} from 'react';
import debounce from 'lodash/debounce';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { ArticleInfo } from './Article';

import styles from './ArticleCard.module.sass';
import {Article} from "../../types/Article";

const _toggleLike = debounce(() => {
  console.log('toggle like');
}, 1000);

export interface ArticleCardProps {
  article: Article;
  onOpen: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLike = () => {
    setLiked(!liked);
    _toggleLike();
  };

  const openArticle = () => {
    if (typeof onOpen === 'function') onOpen();
  };

  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.cardMedia}
        image={article.coverUrl}
      />
      <CardContent>
        <ArticleInfo article={article} />
        <Typography
          className={styles.title}
          onClick={openArticle}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {article.title}
        </Typography>
        <Typography component="p" className={styles.preview}>
          {article.preview}
        </Typography>
        {
          article.labels ? article.labels.split(',').map((label, index) =>
            <Chip key={index} label={'#'+label} className={styles.label} />
          ) : null
        }
      </CardContent>
      <CardActions className={styles.cardAction}>
        {/*<div>
            <FavoriteIcon
              className={liked ? styles.liked : styles.likeDefault}
              onClick={this.toggleLike}
            />
            <div className={styles.likes}>{likes}</div>
          </div>*/}
        <Button color="primary" onClick={openArticle}>阅读全文</Button>
      </CardActions>
    </Card>
  )
};

export default ArticleCard;
