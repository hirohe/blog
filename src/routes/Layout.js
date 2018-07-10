import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import TwitterIcon from '../components/icons/Twitter';
import GitHubIcon from '../components/icons/GitHub';

import DrawerList from './Layout/DrawerList';

import styles from './Layout.css'

export const LayoutContext = React.createContext({
  title: '',
  updateTitle: () => {},

  openDrawer: false,
  toggleDrawer: () => {},
});

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'App',
      openDrawer: false,
    };
  }

  updateTitle = (title) => {
    this.setState({ title });
  };

  toggleDrawer = (open) => {
    this.setState({ openDrawer: !!open });
  };

  render() {

    const { children } = this.props;
    const { title, openDrawer } = this.state;

    const layoutContext = {
      title,
      updateTitle: this.updateTitle,
      openDrawer,
      toggleDrawer: this.toggleDrawer,
    };

    return (
      <LayoutContext.Provider value={layoutContext}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit">
                <MenuIcon onClick={()=>{this.toggleDrawer(true)}} />
              </IconButton>

              <Typography variant="title" color="inherit" className={styles.appBarTitle}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer open={openDrawer} onClose={()=>{this.toggleDrawer(false)}}>
            <div className={styles.drawerInfo}>
              <Avatar
                alt="hirohe"
                style={{
                  width: 60,
                  height: 60,
                }}
                src="https://avatars2.githubusercontent.com/u/14357567?v=3&u=d3788aa9932f57e8e5aa64389d3f148535c36458&s=400"
              />
              <div className={styles.name}>Hirohe</div>
              <div className={styles.drawerInfoIcons}>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </div>
            </div>

            <Divider />

            <DrawerList />
          </Drawer>

          <div>
            {children}
          </div>
        </div>
      </LayoutContext.Provider>
    )
  }

}

export default Layout;
