import { Collapse, ListItemButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { navy } from '../../theme.js'

// Molecule: a collapsible section header — an uppercase label plus a chevron
// that rotates as the body opens and closes.
export default function CollapsibleSection({ label, open, onToggle, px = 2, children }) {
  return (
    <>
      <ListItemButton
        onClick={onToggle}
        disableRipple
        sx={{
          px,
          pt: 1,
          pb: 1,
          '&:hover': { bgcolor: 'transparent' },
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: navy.textDim,
            opacity: 0.7,
          }}
        >
          {label}
        </Typography>
        <ExpandMoreIcon
          sx={{
            fontSize: 18,
            color: navy.textDim,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}
