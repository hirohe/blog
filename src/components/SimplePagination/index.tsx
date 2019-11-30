import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {PaginationProps} from "../../types/common";

const SimplePagination: React.FC<PaginationProps> = ({ page, pageSize, total, onChange }) => {
  let pages = 0;
  if (total > 0 && pageSize > 0) pages = Math.ceil(total / pageSize);

  return (
    <div>
      <Button
        disabled={page <= 1}
        onClick={() => onChange && onChange(page - 1)}
      >
        上一页
      </Button>
      <Typography component="span" style={{display: 'inline', margin: '0 16px'}}>
        {`${page}/${pages}`}
      </Typography>
      <Button
        disabled={page >= pages}
        onClick={() => onChange && onChange(page + 1)}
      >
        下一页
      </Button>
    </div>
  )
};

export default SimplePagination;
