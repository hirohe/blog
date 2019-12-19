import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
/* custom renderers */
import CodeBlock from './MarkdownRenders/CodeBlock';
import BlockQuote from './MarkdownRenders/BlockQuote';
import CalendarTodayIcon from '../icons/CalendarToday';
import {renderCategory} from '../../utils/common';

import CommonShareButton from '../CommonShareButton';

import styles from './Article.module.sass';
import dateFormat from "date-fns/format";
import {Article} from "../../types/Article";

const renderers = {
  ...ReactMarkdown.renderers,
  code: CodeBlock,
  blockquote: BlockQuote,
};

const DATE_FORMAT = 'yy-MM-dd HH:mm';

export interface ArticleInfoProps {
  article: Article;
}

export const ArticleInfo: React.FC<ArticleInfoProps> = ({ article }) => {
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
};

export interface ArticleComponentProps {
  article: Article;
  htmlMode: 'skip' | 'escape';
  onReply: (id: number) => void;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article, htmlMode, onReply }) => {
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
              <Typography align="center" gutterBottom variant="h4" component="h4">
                {article.title}
              </Typography>

              <ArticleInfo article={article}/>

              <div>
                {
                  article.labels ? article.labels.split(',').map((label, index) =>
                    <Chip key={index} label={'#' + label} className={styles.label}/>
                  ) : null
                }
              </div>

              <Divider className={styles.labelsBottomDivider} light/>

              <Typography component="div">
                <ReactMarkdown
                  source={article.content || ''}
                  skipHtml={htmlMode === 'skip'}
                  escapeHtml={htmlMode === 'escape'}
                  renderers={renderers}
                />
              </Typography>
            </CardContent>
            <Divider light/>
            <CardActions className={styles.cardActions}>
              <CommonShareButton onShareSuccess={() =>  {}} onShareReject={() => {}}/>
              <IconButton onClick={() => onReply(article.id)}>
                <CommentIcon/>
              </IconButton>
            </CardActions>
          </Card>
        ) : null
      }
    </div>
  )
};

export default ArticleComponent;
