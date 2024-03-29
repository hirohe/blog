import { useTheme, Theme } from '@mui/material/styles'
import { Breakpoint, useMediaQuery } from '@mui/material'

type BreakpointOrNull = Breakpoint | null

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
export default function useWidth() {
  const theme: Theme = useTheme()
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}
