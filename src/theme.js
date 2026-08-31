import { createTheme } from '@mui/material/styles'

// Shared palette tokens so the sidebar and its lighter "project picker"
// zone can reference the same navy family.
export const navy = {
  base: '#0f1b2d', // sidebar background — dark navy toward black
  raised: '#152338', // slightly raised panels inside the sidebar
  hover: '#1e3a5f', // hover / active — lighter, more blueish
  accent: '#4f83cc', // active indicator / accent blue
  textDim: '#8a9bb3', // muted labels
  textBright: '#e6edf6',
}

// Deutsche Bahn red — the primary action colour, reused for the small mark
// that flags the active navigation row.
export const brandRed = {
  main: '#B4121B',
  dark: '#970e16',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2f6fed' },
    background: {
      default: '#f4f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1b2436',
      secondary: '#5b6577',
    },
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
})

export default theme
