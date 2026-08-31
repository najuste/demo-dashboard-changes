import { Typography } from '@mui/material'
import { navy } from '../../theme.js'

// Atom: an uppercase section caption ("Client", "Project", …).
export default function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        px: 3,
        pt: 2,
        pb: 0.5,
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: navy.textDim,
        opacity: 0.7,
      }}
    >
      {children}
    </Typography>
  )
}
