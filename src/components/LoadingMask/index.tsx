import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.sass';

export interface LoadingMaskProps {
  loading: boolean;
}

interface LoadingMaskState {
  loading: boolean;
}

class LoadingMask extends React.Component<LoadingMaskProps, LoadingMaskState> {

  loadingStartTimeOut: number | null = null;
  loadingEndTimeOut: number | null = null;

  constructor(props: LoadingMaskProps) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps: LoadingMaskProps) {
    const { loading: newLoading } = nextProps;
    const { loading: oldLoading } = this.props;
    if (newLoading !== oldLoading) {
      if (newLoading) {
        this.loadingStartTimeOut = window.setTimeout(() => {
          this.setState({ loading: true });
        }, 500)
      } else {
        const { loading } = this.state;
        if (loading) { // already loading
          // TODO have better way ?
          this.loadingEndTimeOut = window.setTimeout(() => {
            this.setState({ loading: false });
          }, 200);
        } else { // not yet
          this.loadingStartTimeOut && clearTimeout(this.loadingStartTimeOut);
        }
      }
    }
  }

  componentWillUnmount() {
    this.loadingStartTimeOut && clearTimeout(this.loadingStartTimeOut);
    this.loadingEndTimeOut && clearTimeout(this.loadingEndTimeOut);
  }

  render() {
    const { children, loading } = this.props;

    return (
      <div className={styles.root}>
        {
          loading && (
            <div className={styles.mask}>
              <CircularProgress className={styles.spinner} />
            </div>
          )
        }
        <div className={styles.container}>
          {children}
        </div>
      </div>
    )
  }
}

export default LoadingMask;
