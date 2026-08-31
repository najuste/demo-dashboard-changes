import { ListItemIcon, ListItemText } from '@mui/material'
import ItemShell from './ItemShell.jsx'

// Molecule: a navigation row — an icon + label that routes elsewhere. It holds
// the navigation behaviour; the look (including the active side-mark) comes
// from ItemShell.
export default function NavItem({ icon, label, active, onClick, dense, disabled }) {
  return (
    <ItemShell active={active} onClick={onClick} dense={dense} disabled={disabled}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{ fontSize: dense ? 13 : 14, fontWeight: 500 }}
      />
    </ItemShell>
  )
}
