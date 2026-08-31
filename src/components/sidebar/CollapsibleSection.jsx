import { Box, Collapse, ListItemButton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { navy } from '../../theme.js'

// Molecule: a collapsible section header — an uppercase label plus a chevron
// that rotates as the body opens and closes. Pass `containerSx` to wrap the
// header and body together on one surface (e.g. the tinted Project group), so
// the title shares its section's background.
export default function CollapsibleSection({ label, open, onToggle, px = 2, containerSx, children }) {
  const content = (
    <>
      <ListItemButton
        onClick={onToggle}
        disableRipple
        sx={{
          px,
          pt: 0.5,
          pb: 0.5,
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

  return containerSx ? <Box sx={containerSx}>{content}</Box> : content
}
