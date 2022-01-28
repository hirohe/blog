import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './index.module.sass'

export interface LoadingMaskProps {
  loading: boolean
  delay?: number
}

const LoadingMask: React.FC<LoadingMaskProps> = ({
  loading: loadingFromProps,
  delay = 300,
  children,
}) => {
  const [loading, setLoading] = useState(loadingFromProps)
  const [loadingStartTimer, setLoadingStartTimer] = useState<number | null>(
    null
  )
  const [loadingEndTimer, setLoadingEndTimer] = useState<number | null>(null)

  useEffect(() => {
    return () => {
      if (loadingStartTimer !== null) clearTimeout(loadingStartTimer)
      if (loadingEndTimer !== null) clearTimeout(loadingEndTimer)
    }
  }, [])

  useEffect(() => {
    if (loadingFromProps) {
      if (loadingStartTimer === null) {
        setLoadingStartTimer(
          window.setTimeout(() => {
            setLoading(true)
            setLoadingStartTimer(null)
          }, delay)
        )
      }
    } else {
      if (loading) {
        // already loading
        if (loadingEndTimer === null) {
          setLoadingEndTimer(
            window.setTimeout(() => {
              setLoading(false)
              setLoadingEndTimer(null)
            }, 500)
          )
        }
      } else {
        // not yet loading, cancel the timer
        if (loadingStartTimer !== null) {
          clearTimeout(loadingStartTimer)
          setLoadingStartTimer(null)
        }
      }
    }
  }, [loadingFromProps])

  return (
    <div className={styles.root}>
      {loading && (
        <div className={styles.mask}>
          <CircularProgress className={styles.spinner} />
        </div>
      )}
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default LoadingMask
