import { ListItemButton } from '@mui/material'
import { navy, brandRed } from '../../theme.js'

// Atom: the presentational shell for a sidebar row. It owns all the row
// styling — the row stretches edge to edge, hover only nudges the background a
// touch, and a 4px red tick on the left marks the row: lighter on hover,
// darker when active. Components on top (NavItem, …) carry only content and
// behaviour, not looks.
export default function ItemShell({ active, disabled, dense, onClick, children, sx }) {
  return (
    <ListItemButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: 'relative',
        // Full-bleed: no side margins or radius, so hover fills the whole width.
        mx: 0,
        my: 0,
        py: dense ? 0.35 : 0.75,
        color: active ? navy.textBright : navy.textDim,
        '& .MuiListItemIcon-root': {
          color: 'inherit',
          minWidth: dense ? 30 : 36,
        },
        // The left tick: hidden at rest, darker red once active.
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 8,
          bottom: 8,
          width: 4,
          borderRadius: '0 2px 2px 0',
          bgcolor: active ? brandRed.dark : 'transparent',
          transition: 'background-color 0.15s',
        },
        // Hover only barely lifts the background; the tick fades in (lighter
        // red, or stays dark if the row is already active).
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.04)',
          color: navy.textBright,
          '&::before': { bgcolor: active ? brandRed.dark : brandRed.main },
        },
        ...sx,
      }}
    >
      {children}
    </ListItemButton>
  )
}
