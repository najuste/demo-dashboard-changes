import { useRef, useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'

const DB_RED = '#B4121B'
const DB_RED_HOVER = '#970e16'

const LAYER_TYPES = ['Raster', 'Vector', 'Point cloud', 'Annotation']
const LAYER_GROUPS = ['Base maps', 'Overlays', 'Measurements', 'Ungrouped']

// Accepted upload formats, shown to the user and used to constrain the picker.
const ACCEPTED_FILE_TYPES = '.tif, .geojson, .shp, .las'

// A minimal, tucked-away colour picker: just a swatch that opens the native
// picker on click, plus the hex value. No always-on rainbow strip.
function ColorField({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <TextField
      variant="standard"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ spellCheck: false }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ButtonBase
              onClick={() => inputRef.current?.click()}
              sx={{
                width: 16,
                height: 16,
                borderRadius: 0.5,
                bgcolor: value,
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.2)',
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  opacity: 0,
                  border: 0,
                  padding: 0,
                }}
              />
            </ButtonBase>
          </InputAdornment>
        ),
      }}
    />
  )
}

// A lean file picker styled to match the other fields: a read-only line
// showing the chosen file, with the picker hidden behind an attach icon.
function FileField({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <TextField
      variant="standard"
      fullWidth
      value={value?.name ?? ''}
      placeholder="Select file…"
      onClick={() => inputRef.current?.click()}
      InputProps={{
        readOnly: true,
        sx: { cursor: 'pointer' },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              onClick={() => inputRef.current?.click()}
            >
              <UploadFileOutlinedIcon fontSize="small" />
            </IconButton>
            <input
              ref={inputRef}
              type="file"
              hidden
              accept={ACCEPTED_FILE_TYPES}
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default function AddLayerDialog({ open, onClose, onCreate }) {
  const [type, setType] = useState('')
  const [group, setGroup] = useState('')
  const [name, setName] = useState('Unnamed layer')
  const [color, setColor] = useState('#00ff00')
  const [file, setFile] = useState(null)
  const [is3d, setIs3d] = useState(false)

  const handleCreate = () => {
    onCreate?.({
      type,
      group,
      name,
      color,
      file,
      dimensions: is3d ? '3D' : '2D',
    })
    onClose?.()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      {/* Header: icon + title on the left, close on the right */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          fontSize: 18,
          fontWeight: 700,
          py: 1.75,
        }}
      >
        <LayersOutlinedIcon fontSize="small" />
        <Box component="span" sx={{ flexGrow: 1 }}>
          Add new layer
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary', mr: -0.5 }}
          aria-label="close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />

      {/* Body */}
      <DialogContent sx={{ pt: 2.5 }}>
        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mb: 2.5,
            py: 0.5,
            fontSize: 13,
            '& .MuiAlert-message': { py: 0.5 },
          }}
        >
          <AlertTitle sx={{ fontSize: 13, fontWeight: 600, mb: 0.25 }}>
            Before you upload
          </AlertTitle>
          Accepted formats: {ACCEPTED_FILE_TYPES}. Make sure your file includes a
          valid coordinate system and layer metadata — these are not validated
          automatically.
        </Alert>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            select
            label="Layer type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {LAYER_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Layer groups"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {LAYER_GROUPS.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="standard"
            label="Layer name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              Layer color *
            </Typography>
            <ColorField value={color} onChange={setColor} />
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}
            >
              Source file
            </Typography>
            <FileField value={file} onChange={setFile} />
          </Box>

          {/* Layer dimensions: a lean 2D / 3D switch, laid out like a field
              with its label on top and the choice underneath. */}
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              Layer dimensions
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: is3d ? 400 : 600,
                  color: is3d ? 'text.secondary' : 'text.primary',
                }}
              >
                2D
              </Typography>
              <Switch
                size="small"
                checked={is3d}
                onChange={(e) => setIs3d(e.target.checked)}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: is3d ? 600 : 400,
                  color: is3d ? 'text.primary' : 'text.secondary',
                }}
              >
                3D
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{ fontSize: 13, color: 'text.secondary' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleCreate}
          sx={{
            fontSize: 13,
            px: 2,
            bgcolor: DB_RED,
            '&:hover': { bgcolor: DB_RED_HOVER },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
