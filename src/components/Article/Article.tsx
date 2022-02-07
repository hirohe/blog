import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CommentIcon from '@mui/icons-material/Comment'
import Divider from '@mui/material/Divider'
import ReactMarkdown from 'react-markdown'
/* custom renderers */
import BlockQuote from './MarkdownRenders/BlockQuote'
import CalendarTodayIcon from '../icons/CalendarToday'
import { renderCategory } from '../../utils/common'

import CommonShareButton from '../CommonShareButton'

import styles from './Article.module.sass'
import dateFormat from 'date-fns/format'
import { Article } from '../../types/Article'

const DATE_FORMAT = 'yy-MM-dd HH:mm'

export interface ArticleInfoProps {
  article: Article
}

export const ArticleInfo: React.FC<ArticleInfoProps> = ({ article }) => {
  return (
    <span className={styles.articleInfo}>
      <span>
        <CalendarTodayIcon />
        {dateFormat(article.createdAt, DATE_FORMAT)}
        <span style={{ margin: '0 4px' }}>|</span>
        {renderCategory(article.category)}
      </span>
    </span>
  )
}

export interface ArticleComponentProps {
  article: Article
  htmlMode: 'skip' | 'escape'
  onReply: (id: number) => void
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  htmlMode,
  onReply,
}) => {
  return (
    <div className={styles.article}>
      {article ? (
        <Card>
          <CardMedia className={styles.cardMedia} image={article.coverUrl} />
          <CardContent className={styles.content}>
            <Typography align="center" gutterBottom variant="h4" component="h4">
              {article.title}
            </Typography>

            <ArticleInfo article={article} />

            <div>
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
            </div>

            <Divider className={styles.labelsBottomDivider} light />

            <Typography component="div">
              <ReactMarkdown
                skipHtml={htmlMode === 'skip'}
                components={{
                  blockquote({ children }) {
                    return <BlockQuote>{children}</BlockQuote>
                  },
                }}
              >
                {article.content || ''}
              </ReactMarkdown>
            </Typography>
          </CardContent>
          <Divider light />
          <CardActions className={styles.cardActions}>
            <CommonShareButton
              onShareSuccess={() => {}}
              onShareReject={() => {}}
            />
            <IconButton onClick={() => onReply(article.id)}>
              <CommentIcon />
            </IconButton>
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}

export default ArticleComponent
