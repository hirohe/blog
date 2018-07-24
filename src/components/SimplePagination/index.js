import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class SimplePagination extends React.PureComponent {
  render() {
    const { pagination: { page, pageSize, total, onChange } } = this.props;
    let pages = 0;
    if(total > 0 && pageSize > 0) pages = Math.ceil(total / pageSize);

    return (
      <div>
        <Button
          disabled={page && page <= 1}
          onClick={() => onChange(page - 1)}
        >
          上一页
        </Button>
        <span style={{margin: '0 16px'}}>
          {`${page}/${pages}`}
        </span>
        <Button
          disabled={page && page >= pages}
          onClick={() => onChange(page + 1)}
        >
          下一页
        </Button>
      </div>
    )
  }
}

SimplePagination.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default SimplePagination;
