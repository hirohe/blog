import { createContext } from 'react'

export interface ILayoutContext {
  title: string
  updateTitle: (title: string) => void
  openDrawer: boolean
  setOpenDrawer: (open: boolean) => void
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void

  showMessage: (message: string) => void
}

const LayoutContext = createContext<ILayoutContext>({
  title: (import.meta.env.VITE_TITLE as string) || 'APP',
  updateTitle: (title: string) => {},
  openDrawer: false,
  setOpenDrawer: (open: boolean) => {},
  darkMode: false,
  setDarkMode: (darkMode: boolean) => {},

  showMessage: () => {},
})

export const LayoutContextProvider = LayoutContext.Provider
export const LayoutContextConsumer = LayoutContext.Consumer
export default LayoutContext
