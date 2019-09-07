import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import InfoIcon from '@material-ui/icons/Info';

export interface DrawerListProps {
  goto: (routePath: string) => void;
}

const style = {
  width: 260,
};

const DrawerList: React.FC<DrawerListProps> = (props) => {
  return (
    <div style={style}>
      <List component="nav">
        <ListItem button onClick={() => {props.goto('/article')}}>
          <ListItemIcon>
            <BookIcon/>
          </ListItemIcon>
          <ListItemText primary="文章"/>
        </ListItem>

        <ListItem button onClick={() => {props.goto('/about')}}>
          <ListItemIcon>
            <InfoIcon/>
          </ListItemIcon>
          <ListItemText primary="关于"/>
        </ListItem>
      </List>
    </div>
  )
};

export default DrawerList;
