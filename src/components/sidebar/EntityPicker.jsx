import { useRef, useState } from 'react'
import { Box, ButtonBase, InputBase, MenuItem, Popover, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { navy } from '../../theme.js'
import EntityAvatar from './EntityAvatar.jsx'

// Molecule: a full-width picker for a single entity (a client or a project).
// Unlike a NavItem it doesn't route anywhere — it only changes the current
// selection. Closed, it shows the chosen entity as a large, rectangular image
// with a slightly bigger title. Open, a search field takes over: you filter
// the list instead of scrolling it.
export default function EntityPicker({
  value,
  options,
  onChange,
  placeholder,
  searchPlaceholder = 'Search…',
  // Background for the open dropdown. Defaults to the raised panel colour; the
  // project picker passes its container's tint so the menu reads as the same
  // surface it sits in.
  menuBg = navy.raised,
}) {
  const triggerRef = useRef(null)
  const searchRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  // Where the dropdown sits, measured at open time. It aligns to the trigger's
  // parent container (the sidebar Box for the client picker, the tinted project
  // group for the project picker) rather than the trigger itself: the width and
  // left edge come from the parent, while the top comes from the trigger so the
  // search field still drops from the item's top line.
  const [menuRect, setMenuRect] = useState(null)

  const selected = options.find((o) => o.id === value)
  const filtered = options.filter((o) =>
    o.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const openMenu = () => {
    setQuery('')
    const trigger = triggerRef.current
    const parent = trigger?.parentElement
    if (trigger && parent) {
      const t = trigger.getBoundingClientRect()
      const p = parent.getBoundingClientRect()
      setMenuRect({ top: t.top, left: p.left, width: p.width })
    }
    setOpen(true)
  }
  const closeMenu = () => setOpen(false)
  const pick = (id) => {
    onChange(id)
    closeMenu()
  }

  return (
    <>
      <ButtonBase
        ref={triggerRef}
        onClick={openMenu}
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          justifyContent: 'flex-start',
          gap: 1.25,
          px: 1.25,
          py: 1,
          borderRadius: 1,
          // No border at rest; on hover a rounded border fades in. A translucent
          // white keeps the line looking identical whether the picker sits on the
          // bare sidebar (client) or the tinted project group.
          border: '1px solid transparent',
          transition: 'border-color 0.15s',
          '&:hover': { borderColor: 'rgba(255,255,255,0.15)' },
        }}
      >
        <EntityAvatar seed={selected?.id ?? 'placeholder'} width={46} height={30} radius={'1px'} />
        <Typography
          sx={{
            flexGrow: 1,
            minWidth: 0,
            textAlign: 'left',
            fontSize: 14,
            fontWeight: 600,
            color: selected ? navy.textBright : navy.textDim,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selected ? selected.name : placeholder}
        </Typography>
        {/* Dropdown caret: lighter and smaller than the collapsible-section
            chevrons, so a "select" reads differently from a "collapse". */}
        <ExpandMoreIcon sx={{ fontSize: 16, color: navy.textDim, opacity: 0.5 }} />
      </ButtonBase>

      <Popover
        open={open}
        onClose={closeMenu}
        // Pin to an explicit point (parent's left edge + trigger's top edge) so
        // the dropdown spans the parent container's width and drops from the
        // item's top line, taking over exactly where the item sat.
        anchorReference="anchorPosition"
        anchorPosition={menuRect ? { top: menuRect.top, left: menuRect.left } : undefined}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        // Move the caret into the search field once the menu has opened, so you
        // can type straight away. autoFocus alone loses to the Popover focusing
        // its own Paper on enter.
        TransitionProps={{ onEntered: () => searchRef.current?.focus() }}
        slotProps={{
          paper: {
            sx: {
              width: menuRect?.width,
              boxSizing: 'border-box',
              bgcolor: menuBg,
              color: navy.textBright,
              border: '1px solid rgba(255,255,255,0.08)',
            },
          },
        }}
      >
        {/* Search field — filters the list in place */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.25,
            py: 0.75,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <SearchOutlinedIcon sx={{ fontSize: 18, color: navy.textDim }} />
          <InputBase
            autoFocus
            inputRef={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            sx={{
              flexGrow: 1,
              fontSize: 13,
              color: navy.textBright,
              '& input::placeholder': { color: navy.textDim, opacity: 1 },
            }}
          />
        </Box>

        <Box sx={{ maxHeight: 260, overflowY: 'auto', py: 0.5 }}>
          {filtered.map((o) => (
            <MenuItem
              key={o.id}
              selected={o.id === value}
              onClick={() => pick(o.id)}
              sx={{
                gap: 1,
                fontSize: 13,
                '&:hover': { bgcolor: navy.hover },
                '&.Mui-selected': {
                  bgcolor: navy.hover,
                  '&:hover': { bgcolor: navy.hover },
                },
              }}
            >
              <EntityAvatar seed={o.id} width={24} height={24} radius={0.75} />
              {o.name}
            </MenuItem>
          ))}
          {filtered.length === 0 && (
            <Typography
              sx={{ px: 2, py: 1.5, fontSize: 13, fontStyle: 'italic', color: navy.textDim }}
            >
              No matches.
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  )
}
