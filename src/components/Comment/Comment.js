import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'date-fns/format';
import distanceToNow from 'date-fns/distance_in_words_to_now';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import zhLocale from 'date-fns/locale/zh_cn';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import IdenticonAvatar from '../IdenticonAvatar';

import styles from './Comment.css';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      comment: {
        id,
        articleId,
        refId,
        name,
        nameHash,
        email,
        content,
        createdAt,
      }
    } = this.props;

    return (
      <Paper className={styles.comment}>
        <Grid container>
          <Grid item className={styles.avatar} sm={1} xs={2}>
            <IdenticonAvatar name={name} hash={nameHash} />
          </Grid>
          <Grid item sm={11} xs={10}>
            <div className={styles.info}>
              <span className={styles.name}>{name}</span>
              <span className={styles.createdAt}>
                {
                  differenceInMinutes(new Date(), createdAt) > 10 ?
                  dateFormat(createdAt, 'YYYY-MM-DD') :
                  distanceToNow(createdAt, { locale: zhLocale }) + ' 前'
                }
              </span>
              <span className={styles.id}>
                #{id.substring(0, 4)}...
              </span>

              <Button
                color="secondary"
                size="small"
                className={styles.replyBtn}
              >
                回复
              </Button>
            </div>
            <div className={styles.content}>
              <Typography component="p">
                {content}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    nameHash: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default Comment;
