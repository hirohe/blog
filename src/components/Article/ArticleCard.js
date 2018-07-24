import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce'
import dateFormat from 'date-fns/format';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import CalendarTodayIcon from '../icons/CalendarToday';
import FavoriteIcon from '../icons/Favorite';
import { renderCategory } from '../../utils/common';

import styles from './ArticleCard.css';

const DATE_FORMAT = 'YY-MM-DD HH:mm';

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
    const {
      title, coverUrl, preview,
      category, labels, likes,
      createdAt, updatedAt,
    } = this.props;

    const { liked } = this.state;

    return (
      <Card className={styles.card}>
        <CardMedia
          className={styles.cardMedia}
          image={coverUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <span className={styles.articleInfo}>
            <span>
              <CalendarTodayIcon />
              {dateFormat(createdAt, DATE_FORMAT)}
              <span style={{margin: '0 4px'}}>|</span>
              {renderCategory(category)}
            </span>
          </span>
          <a onClick={this.openArticle} className={styles.title}>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
          </a>
          <Typography component="p" className={styles.preview}>
            {preview}
          </Typography>
          {
            labels ? labels.split(',').map((label, index) =>
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
  title: PropTypes.string.isRequired,
  coverUrl: PropTypes.string,
  category: PropTypes.string,
  preview: PropTypes.string,
  labels: PropTypes.string,
  likes: PropTypes.number,
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
  onOpen: PropTypes.func,
};

export default ArticleCard;
