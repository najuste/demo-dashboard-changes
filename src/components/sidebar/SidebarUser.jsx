import { useState } from 'react'
import {
  Avatar,
  Box,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { navy } from '../../theme.js'
import { avatarSrc } from './EntityAvatar.jsx'

// Organism: the account row pinned to the bottom of the sidebar — avatar,
// name + role, and a small side menu for language / logout.
export default function SidebarUser({ name, role, seed }) {
  const [anchor, setAnchor] = useState(null)

  return (
    <>
      <ListItemButton
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          px: 3,
          py: 1.5,
          gap: 1.25,
          '&:hover': { bgcolor: navy.hover },
        }}
      >
        <Avatar src={avatarSrc(seed)} sx={{ width: 34, height: 34 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: navy.textDim, lineHeight: 1.2 }}>
            {role}
          </Typography>
        </Box>
      </ListItemButton>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        MenuListProps={{ dense: true }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: navy.raised,
              color: navy.textBright,
              border: '1px solid rgba(255,255,255,0.08)',
              minWidth: 180,
              '& .MuiMenuItem-root': {
                fontSize: 13,
                '& .MuiListItemIcon-root': { color: navy.textDim, minWidth: 32 },
                '&:hover': { bgcolor: navy.hover },
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <LanguageOutlinedIcon fontSize="small" />
          </ListItemIcon>
          User Language
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
