import React from 'react';
import Typography from '@material-ui/core/Typography';

const style = {
  paddingLeft: '1rem',
  marginTop: '0.35rem',
};

class SubHeader extends React.PureComponent {
  render() {
    return (
      <Typography style={style} variant="subheading" gutterBottom>
        {this.props.children}
      </Typography>
    )
  }
}

export default SubHeader;
