import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class MessageSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.queue = [];
    this.state = {
      messageInfo: {},
      open: false,
    };
  }

  show = (message) => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { open, messageInfo: { key, message } } = this.state;

    return (
      <Snackbar
        key={key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    )
  }
}

export default MessageSnackbar;
