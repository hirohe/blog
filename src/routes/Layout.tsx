import React from 'react'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import { SnackbarProvider } from 'notistack'

import TwitterIcon from '../components/icons/Twitter'
import GitHubIcon from '../components/icons/GitHub'
import BrightnessMoonIcon from '@mui/icons-material/Brightness2'
import BrightnessSunIcon from '@mui/icons-material/Brightness5'

import ErrorContent from '../components/ErrorContent'
import DrawerList from './Layout/DrawerList'
import Footer from './Layout/Footer'
import { ILayoutContext, LayoutContextProvider } from './Layout/LayoutContext'
import withNavigate, { WithNavigate } from '../hoc/withNavigate'

import styles from './Layout.module.sass'

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export type LayoutProps = WithNavigate

export interface LayoutState {
  title: string
  openDrawer: boolean
  darkMode: boolean
  theme: Theme
  hasError: boolean
  errorMessage: string | null
}

class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props)

    this.state = {
      title: 'App',
      openDrawer: false,
      darkMode: false,
      theme: defaultTheme,

      hasError: false,
      errorMessage: null,
    }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.log(error.message, info)
    this.setState({ hasError: true, errorMessage: error.message })
  }

  toggleDarkTheme = () => {
    const { darkMode } = this.state
    let theme = defaultTheme
    const rootEl = document.querySelector('#root')
    if (!darkMode) {
      if (rootEl) rootEl.classList.add('dark')
      theme = createTheme({
        palette: {
          mode: 'dark',
        },
      })
    } else {
      if (rootEl) rootEl.classList.remove('dark')
    }
    this.setState({ theme, darkMode: !darkMode })
  }

  updateTitle = (title: string) => {
    this.setState({ title })
  }

  toggleDrawer = (open: boolean) => {
    this.setState({ openDrawer: open })
  }

  goto = (path: string) => {
    this.props.navigate({ pathname: path })
    this.setState({ openDrawer: false })
  }

  render() {
    const { children } = this.props
    const { title, openDrawer, theme, hasError, errorMessage } = this.state

    const layoutContext: ILayoutContext = {
      title,
      updateTitle: this.updateTitle,
      darkMode: this.state.darkMode,
      openDrawer,
      setOpenDrawer: this.toggleDrawer,
      setDarkMode: this.toggleDarkTheme,
      showMessage: () => {}, // TODO
    }

    return (
      <LayoutContextProvider value={layoutContext}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={2}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  onClick={() => {
                    this.toggleDrawer(true)
                  }}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Typography
                  variant="h6"
                  color="inherit"
                  className={styles.appBarTitle}
                >
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer
              open={openDrawer}
              onClose={() => {
                this.toggleDrawer(false)
              }}
            >
              <div>
                <IconButton
                  onClick={this.toggleDarkTheme}
                  className={styles.brightnessBtn}
                >
                  {theme.palette.mode === 'light' ? (
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
                  variant="h5"
                  component="div"
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
              {hasError && errorMessage ? (
                <ErrorContent content={errorMessage} />
              ) : (
                children
              )}
            </div>

            <Footer author="hirohe" />
          </SnackbarProvider>
        </ThemeProvider>
      </LayoutContextProvider>
    )
  }
}

export default withNavigate(Layout)
