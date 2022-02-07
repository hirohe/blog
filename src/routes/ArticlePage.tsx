import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import LayoutContext, { ILayoutContext } from './Layout/LayoutContext'
import ArticleComponent from '../components/Article'
import { CommentList, CommentEditor } from '../components/Comment'
import ErrorContent from '../components/ErrorContent'
import SubHeader from '../components/SubHeader'

import {
  fetchArticle,
  fetchArticleComments,
  postComment,
} from '../services/Article'
import { fetchComment } from '../services/Comment'

import styles from './ArticlePage.module.sass'
import CircularProgress from '@mui/material/CircularProgress'
import { Article } from '../types/Article'
import { Page } from '../types/common'
import { Comment } from '../types/Comment'
import { useSnackbar } from 'notistack'
import { OnReplyComment } from '../components/Comment/CommentEditor'
import { useParams } from 'react-router-dom'

const ArticlePage: React.FC = () => {
  const routeParams = useParams<{
    id: string
  }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Page<Comment>>({
    records: [],
    page: 1,
    pageSize: 5,
    total: 0,
  })
  const [loadingComments, setLoadingComments] = useState<boolean>(false)
  const [refId, setRefId] = useState<number | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const commentListWrapper = useRef<HTMLDivElement>(null)
  const commentEditorWrapper = useRef<HTMLDivElement>(null)

  const layoutContext = useContext<ILayoutContext>(LayoutContext)

  const { enqueueSnackbar } = useSnackbar()

  const handleArticleIdChange = useCallback(() => {
    setHasError(false)
    if (routeParams.id) {
      fetchArticle(routeParams.id)
        .then((article) => {
          if (article) {
            article.createdAt = new Date(article.createdAt)
            if (article.updatedAt)
              article.updatedAt = new Date(article.updatedAt)
            setArticle(article)
          }
        })
        .catch((errorMessage) => {
          setHasError(true)
          setErrorMessage(errorMessage)
        })
    }
  }, [routeParams.id])

  useEffect(() => {
    function onWindowScroll() {
      if (routeParams.id && isCommentListInViewport()) {
        // cancel
        window.removeEventListener('scroll', onWindowScroll)
        getArticleComments(routeParams.id)
      }
    }

    layoutContext.updateTitle('文章')
    window.addEventListener('scroll', onWindowScroll, { once: true })

    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [])

  useEffect(() => {
    handleArticleIdChange()
  }, [routeParams.id, handleArticleIdChange])

  function isCommentListInViewport(offset = 0) {
    if (commentListWrapper.current) {
      const top = commentListWrapper.current.getBoundingClientRect().top
      return top + offset >= 0 && top - offset <= window.innerHeight
    }

    return false
  }

  const getArticleComments = (id: string, page = 1, pageSize = 5) => {
    setLoadingComments(true)
    fetchArticleComments(parseInt(id, 10), page, pageSize)
      .then((commentPage) => {
        setComments(commentPage)
      })
      .catch(() => {
        enqueueSnackbar('获取评论失败！')
      })
      .finally(() => {
        setLoadingComments(false)
      })
  }

  const onCommentPageChange = (page: number, pageSize?: number) => {
    routeParams.id && getArticleComments(routeParams.id, page, pageSize)
  }

  const onReplyArticle = () => {
    setRefId(null)
    if (commentEditorWrapper.current) {
      commentEditorWrapper.current.scrollIntoView()
      // offset
      window.scrollBy(0, -50)
    }
  }

  const onReplyComment = (commentId: number) => {
    if (commentId) setRefId(commentId)
  }

  const onGetRefComment = (refId: number) => {
    return fetchComment(refId)
      .then((refComment) => {
        refComment.createdAt = new Date(refComment.createdAt)
        return refComment
      })
      .catch(() => {
        enqueueSnackbar('获取评论失败', { variant: 'warning' })
        return Promise.reject()
      })
  }

  const onRefIdRemove = () => {
    setRefId(null)
  }

  const onReplySend = async (comment: OnReplyComment) => {
    const articleId = routeParams.id
    if (articleId) {
      return postComment(articleId, comment)
        .then(() => {
          enqueueSnackbar('发送成功')
          getArticleComments(articleId)
        })
        .catch(() => {
          enqueueSnackbar('发送失败😱')
        })
    }
  }

  return (
    <React.Fragment>
      {hasError ? (
        <ErrorContent content={errorMessage || ''} />
      ) : article ? (
        <div className={styles.content}>
          <div className={styles.block}>
            <ArticleComponent
              article={article}
              htmlMode="escape"
              onReply={onReplyArticle}
            />
          </div>

          <div className={styles.block}>
            <SubHeader>评论</SubHeader>
            <div className={styles.commentEditor} ref={commentEditorWrapper}>
              <CommentEditor
                refId={refId}
                onRefIdRemove={onRefIdRemove}
                onReplySend={onReplySend}
              />
            </div>
          </div>

          <SubHeader>
            评论列表 {comments.total ? comments.total : 0} 条
          </SubHeader>
          <div className={styles.commentListContent} ref={commentListWrapper}>
            {loadingComments ? (
              <div
                className={styles.commentListMask}
                style={{ textAlign: 'center' }}
              >
                <div className={styles.commentListLoading}>
                  <CircularProgress size={30} />
                </div>
              </div>
            ) : null}
            <CommentList
              comments={comments.records}
              page={comments.page}
              pageSize={comments.pageSize}
              total={comments.total}
              onChange={onCommentPageChange}
              onReply={onReplyComment}
              onGetRefComment={onGetRefComment}
            />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default ArticlePage
