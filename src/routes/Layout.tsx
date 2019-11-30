import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme, {Theme} from '@material-ui/core/styles/createMuiTheme';
import MenuIcon from '@material-ui/icons/Menu';
import { SnackbarProvider } from 'notistack';

import TwitterIcon from '../components/icons/Twitter';
import GitHubIcon from '../components/icons/GitHub';
import BrightnessMoonIcon from '@material-ui/icons/Brightness2';
import BrightnessSunIcon from '@material-ui/icons/Brightness5';

import ErrorContent from '../components/ErrorContent';
import DrawerList from './Layout/DrawerList';
import Footer from './Layout/Footer';
import {ILayoutContext, LayoutContextProvider} from './Layout/LayoutContext';

import styles from './Layout.module.sass';
import {history} from '../router';

const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export interface LayoutProps {
}

export interface LayoutState {
  title: string;
  openDrawer: boolean;
  darkMode: boolean;
  theme: Theme;
  hasError: boolean;
  errorMessage: string | null;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      title: 'App',
      openDrawer: false,
      darkMode: false,
      theme: defaultTheme,

      hasError: false,
      errorMessage: null
    };
  }

  componentDidCatch(error: Error, info: any) {
    console.log(error.message, info);
    this.setState({ hasError: true, errorMessage: error.message })
  }

  toggleDarkTheme = () => {
    const { darkMode } = this.state;
    let theme = defaultTheme;
    const rootEl = document.querySelector('#root');
    if (!darkMode) {
      if (rootEl) rootEl.classList.add('dark');
      theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
      });
    } else {
      if (rootEl) rootEl.classList.remove('dark');
    }
    this.setState({ theme, darkMode: !darkMode });
  };

  updateTitle = (title: string) => {
    this.setState({ title });
  };

  toggleDrawer = (open: boolean) => {
    this.setState({ openDrawer: open });
  };

  goto = (path: string) => {
    history.push(path);
    this.setState({ openDrawer: false });
  };

  render() {
    const { children } = this.props;
    const { title, openDrawer, theme, hasError, errorMessage } = this.state;

    const layoutContext: ILayoutContext = {
      title,
      updateTitle: this.updateTitle,
      darkMode: this.state.darkMode,
      openDrawer,
      setOpenDrawer: this.toggleDrawer,
      setDarkMode: this.toggleDarkTheme,
      showMessage: () => {}, // TODO
    };

    return (
      <LayoutContextProvider value={layoutContext}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={2}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton onClick={()=>{this.toggleDrawer(true)}} color="inherit">
                  <MenuIcon />
                </IconButton>

                <Typography variant="h6" color="inherit" className={styles.appBarTitle}>
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer open={openDrawer} onClose={()=>{this.toggleDrawer(false)}}>
              <div>
                <IconButton onClick={this.toggleDarkTheme} className={styles.brightnessBtn}>
                  {theme.palette.type === 'light' ? (
                    <BrightnessMoonIcon />
                  ) : (
                    <BrightnessSunIcon />
                  )}
                </IconButton>
              </div>
              <div className={styles.drawerInfo}>
                <Avatar
                  alt="hirohe"
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  src="https://avatars2.githubusercontent.com/u/14357567?s=200"
                />
                <Typography
                  variant="h5" component="div"
                  gutterBottom
                  className={styles.name}
                >
                  hirohe
                </Typography>
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

              <DrawerList goto={this.goto} />

            </Drawer>

            <div className={styles.content}>
              {
                hasError && errorMessage ? (
                  <ErrorContent content={errorMessage} />
                ) : children
              }
            </div>

            <Footer author="hirohe" />
          </SnackbarProvider>
        </ThemeProvider>
      </LayoutContextProvider>
    )
  }
}

export default Layout;
