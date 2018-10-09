import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.sass';

class LoadingMask extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading: newLoading } = nextProps;
    const { loading: oldLoading } = this.props;
    if (newLoading !== oldLoading) {
      if (newLoading) {
        this.loadingStartTimeOut = setTimeout(() => {
          this.setState({ loading: true });
        }, 500)
      } else {
        const { loading } = this.state;
        if (loading) { // already loading
          // TODO have better way ?
          this.loadingEndTimeOut = setTimeout(() => {
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

LoadingMask.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingMask;
