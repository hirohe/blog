import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import BookIcon from '@mui/icons-material/Book'
import InfoIcon from '@mui/icons-material/Info'

export interface DrawerListProps {
  goto: (routePath: string) => void
}

const style = {
  width: 260,
}

const DrawerList: React.FC<DrawerListProps> = (props) => {
  return (
    <div style={style}>
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            props.goto('/article')
          }}
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="文章" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            props.goto('/about')
          }}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="关于" />
        </ListItem>
      </List>
    </div>
  )
}

export default DrawerList
