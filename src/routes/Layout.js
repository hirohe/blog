import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';
import TwitterIcon from '../components/icons/Twitter';
import GitHubIcon from '../components/icons/GitHub';
import BrightnessMoonIcon from '@material-ui/icons/Brightness2';

import ErrorContent from '../components/ErrorContent';
import DrawerList from './Layout/DrawerList';
import Footer from './Layout/Footer';

import styles from './Layout.css';

export const LayoutContext = React.createContext({
  title: '',
  updateTitle: () => {},

  openDrawer: false,
  toggleDrawer: () => {},

  toggleDarkTheme: () => {},
});

const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'App',
      openDrawer: false,
      isDarkTheme: false,
      theme: defaultTheme,

      hasError: false,
      errorMessage: null
    };
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
    this.setState({ hasError: true, errorMessage: error.message })
  }

  toggleDarkTheme = () => {
    const { isDarkTheme } = this.state;
    let theme = defaultTheme;
    if (!isDarkTheme) {
      document.querySelector('#root').classList.add('dark');
      theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
      });
    } else {
      document.querySelector('#root').classList.remove('dark');
    }
    this.setState({ theme, isDarkTheme: !isDarkTheme });
  };

  updateTitle = (title) => {
    this.setState({ title });
  };

  toggleDrawer = (open) => {
    this.setState({ openDrawer: !!open });
  };

  render() {

    const { children } = this.props;
    const { title, openDrawer, theme, hasError, errorMessage } = this.state;

    const layoutContext = {
      title,
      updateTitle: this.updateTitle,
      openDrawer,
      toggleDrawer: this.toggleDrawer,
      toggleDarkTheme: this.toggleDarkTheme,
    };

    return (
      <LayoutContext.Provider value={layoutContext}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed">
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
                src="https://avatars2.githubusercontent.com/u/14357567?s=200"
              />
              <div className={styles.name}>hirohe</div>
              <div className={styles.drawerInfoIcons}>
                <IconButton href="https://twitter.com/Heecn">
                  <TwitterIcon />
                </IconButton>
                <IconButton href="https://github.com/hirohe">
                  <GitHubIcon />
                </IconButton>
              </div>
            </div>

            <Divider />

            <DrawerList />

            <div className={styles.footer}>
              <IconButton>
                <BrightnessMoonIcon onClick={this.toggleDarkTheme} />
              </IconButton>
            </div>
          </Drawer>

          <div className={styles.content}>
            {
              hasError ? (
                <ErrorContent content={errorMessage} />
              ) : children
            }
          </div>

          <Footer author="hirohe" />
        </MuiThemeProvider>
      </LayoutContext.Provider>
    )
  }
}

export default Layout;
