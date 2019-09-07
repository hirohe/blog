import React from 'react';
import Typography from '@material-ui/core/Typography';

const style = {
  paddingLeft: '1rem',
  marginTop: '0.35rem',
  borderLeft: 'solid 5px #ccc',
};

const SubHeader: React.FC = ({ children }) => {
  return (
    <Typography style={style} variant="subtitle1" gutterBottom>
      {children}
    </Typography>
  )
};

export default SubHeader;
