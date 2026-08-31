import { useRef, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

// A split button: primary action on the left, a dropdown on the right that
// swaps which mode is active. `options` is [{ value, label }].
function SplitButton({ icon, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const current = options.find((o) => o.value === value) ?? options[0]

  return (
    <>
      <ButtonGroup
        variant="outlined"
        size="small"
        ref={anchorRef}
        sx={{ flexShrink: 0, borderRadius: 1.5 }}
      >
        <Button
          startIcon={icon}
          onClick={() =>
            onChange(
              options[(options.findIndex((o) => o.value === value) + 1) %
                options.length].value,
            )
          }
          sx={{
            whiteSpace: 'nowrap',
            fontSize: 13,
            fontWeight: 500,
            py: 0.4,
            px: 1.25,
            color: 'text.secondary',
            bgcolor: 'background.default',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'white',
              borderColor: 'black'},
            '& .MuiButton-startIcon': { mr: 0.5 },
          }}
        >
          {current.label}
        </Button>
        <Button
          onClick={() => setOpen((p) => !p)}
          sx={{ px: 0.25, minWidth: 26, borderColor: 'divider' }}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        placement="bottom-end"
        sx={{ zIndex: 10 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              elevation={0}
              sx={{
                mt: 0.5,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList dense>
                  {options.map((o) => (
                    <MenuItem
                      key={o.value}
                      selected={o.value === value}
                      onClick={() => {
                        onChange(o.value)
                        setOpen(false)
                      }}
                      sx={{
                        fontSize: 13,
                        color: 'text.secondary',
                        fontWeight: o.value === value ? 700 : 400,
                        '&.Mui-selected': {
                          bgcolor: 'transparent',
                        },
                        '&.Mui-selected:hover, &:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      {o.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default function FilterBar({ filters, onChange }) {
  const set = (patch) => onChange({ ...filters, ...patch })

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Filter projects…"
        value={filters.search}
        onChange={(e) => set({ search: e.target.value })}
        sx={{
          minWidth: 220,
          flexGrow: 1,
          maxWidth: 340,
          bgcolor: 'white',
          borderRadius: 1,
          '& .MuiInputBase-input': { fontSize: 13, py: 0.75 },
          '& .MuiOutlinedInput-root': { borderRadius: 1 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* Sort: A→Z / Z→A, or by most recent data upload */}
      <SplitButton
        icon={<SortIcon fontSize="small" />}
        value={filters.sort}
        onChange={(v) => set({ sort: v })}
        options={[
          { value: 'az', label: 'Name A → Z' },
          { value: 'za', label: 'Name Z → A' },
          { value: 'processing', label: 'Recent processing' },
          { value: 'upload', label: 'Recent upload' },
          { value: 'activity', label: 'Recent user activity' },
        ]}
      />

      {/* Active-only, with a dropdown to switch back to all */}
      <SplitButton
        value={filters.status}
        onChange={(v) => set({ status: v })}
        options={[
          { value: 'active', label: 'Active only' },
          { value: 'all', label: 'All projects' },
        ]}
      />

      {/* Has-data, with a dropdown to switch to no-data */}
      <SplitButton
        value={filters.data}
        onChange={(v) => set({ data: v })}
        options={[
          { value: 'with', label: 'With data sources' },
          { value: 'without', label: 'No data sources' },
          { value: 'external', label: 'With external data sources' },
          { value: 'no_externam', label: 'Without external data sources' },
        ]}
      />
    </Box>
  )
}
