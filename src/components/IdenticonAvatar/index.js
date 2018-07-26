import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Identicon from 'identicon.js'

class IdenticonAvatar extends React.PureComponent {
  render() {
    const { name, hash } = this.props;

    return (
      <Avatar
        alt={name || ''}
        src={'data:image/png;base64,' + new Identicon(hash, 200).toString()}
      />
    )
  }
}

IdenticonAvatar.propTypes = {
  name: PropTypes.string,
  hash: PropTypes.string.isRequired,
};

export default IdenticonAvatar;
