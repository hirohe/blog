import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
/* custom renderers */
import CodeBlock from './MarkdownRenders/CodeBlock';
import BlockQuote from './MarkdownRenders/BlockQuote';
import CalendarTodayIcon from '../icons/CalendarToday';
import { renderCategory } from '../../utils/common';

import styles from './Article.css';
import dateFormat from "date-fns/format";

const renderers = {
  ...ReactMarkdown.renderers,
  code: CodeBlock,
  blockquote: BlockQuote,
};

const DATE_FORMAT = 'YY-MM-DD HH:mm';

export function ArticleInfo({ article }) {
  return (
    <span className={styles.articleInfo}>
      <span>
        <CalendarTodayIcon />
        {dateFormat(article.createdAt, DATE_FORMAT)}
        <span style={{margin: '0 4px'}}>|</span>
        {renderCategory(article.category)}
      </span>
    </span>
  )
}

class Article extends React.PureComponent {
  render() {
    const { article, htmlMode } = this.props;

    return (
      <div className={styles.article}>
        {
          article ? (
            <Card>
              <CardMedia
                className={styles.cardMedia}
                image={article.coverUrl}
              />
              <CardContent className={styles.content}>
                <Typography gutterBottom variant="headline" component="h2">
                  {article.title}
                </Typography>

                <ArticleInfo article={article} />

                <div>
                  {
                    article.labels ? article.labels.split(',').map((label, index) =>
                      <Chip key={index} label={'#'+label} className={styles.label} />
                    ) : null
                  }
                </div>

                <Typography component="div">
                  <ReactMarkdown
                    source={article.content}
                    skipHtml={htmlMode === 'skip'}
                    escapeHtml={htmlMode === 'escape'}
                    renderers={renderers}
                  />
                </Typography>
              </CardContent>
            </Card>
          ) : null
        }
      </div>
    )
  }
}

Article.propTypes = {
  htmlMode: PropTypes.oneOf(['skip', 'escape']),
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    coverUrl: PropTypes.string,
    content: PropTypes.string,
    labels: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
};

export default Article;
