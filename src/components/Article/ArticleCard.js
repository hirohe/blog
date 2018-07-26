import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { ArticleInfo } from './Article';

import styles from './ArticleCard.css';

const _toggleLike = debounce(() => {
  console.log('toggle like');
}, 1000);

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  toggleLike = () => {
    const { liked } = this.state;
    this.setState({liked: !liked});
    _toggleLike();
  };

  openArticle = () => {
    const { onOpen } = this.props;
    if (typeof onOpen === 'function') onOpen();
  };

  render() {
    const { article } = this.props;

    const { liked } = this.state;

    return (
      <Card className={styles.card}>
        <CardMedia
          className={styles.cardMedia}
          image={article.coverUrl}
        />
        <CardContent>
          <ArticleInfo article={article} />
          <a onClick={this.openArticle} className={styles.title}>
            <Typography gutterBottom variant="headline" component="h2">
              {article.title}
            </Typography>
          </a>
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
          <Button color="primary" onClick={this.openArticle}>阅读全文</Button>
        </CardActions>
      </Card>
    )
  }

}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    coverUrl: PropTypes.string,
    labels: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
  onOpen: PropTypes.func,
};

export default ArticleCard;
