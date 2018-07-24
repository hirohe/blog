import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import InfoIcon from '@material-ui/icons/Info';
// import Divider from '@material-ui/core/Divider';

const style = {
  width: 260,
};

class DrawerList extends React.Component {
  render() {
    return (
      <div style={style}>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="文章" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="关于" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default DrawerList;
