import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import AddIcon from '@mui/icons-material/Add'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

// Deutsche Bahn red, toned down a shade so it reads calmer than the bright
// signal red.
const DB_RED = '#B4121B'
const DB_RED_HOVER = '#970e16'
import FilterBar from '../components/FilterBar.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import AddLayerDialog from '../components/AddLayerDialog.jsx'
import { projects } from '../data/projects.js'

const initialFilters = {
  search: '',
  sort: 'az',
  status: 'active',
  data: 'with',
}

export default function Dashboard() {
  const [filters, setFilters] = useState(initialFilters)
  const [view, setView] = useState(0)
  const [layerOpen, setLayerOpen] = useState(false)

  const visible = useMemo(() => {
    let rows = projects.filter((p) => {
      if (
        filters.search &&
        !p.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      if (filters.status === 'active' && !p.active) return false
      if (filters.data === 'with' && !p.hasData) return false
      if (filters.data === 'without' && p.hasData) return false
      return true
    })

    rows = [...rows].sort((a, b) => {
      if (filters.sort === 'az') return a.name.localeCompare(b.name)
      if (filters.sort === 'za') return b.name.localeCompare(a.name)
      if (filters.sort === 'recent')
        return b.lastUpload.localeCompare(a.lastUpload)
      return 0
    })
    return rows
  }, [filters])

  const total = projects.length

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Projects Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            disableElevation
            startIcon={<FileUploadOutlinedIcon />}
            sx={{
              fontSize: 13,
              py: 0.4,
              px: 1.25,
              borderRadius: 1,
              color: DB_RED,
              borderColor: 'rgba(180,18,27,0.4)',
              '& .MuiButton-startIcon': { mr: 0.5 },
              '&:hover': {
                borderColor: DB_RED,
                bgcolor: 'rgba(180,18,27,0.05)',
              },
            }}
          >
            Upload data
          </Button>
          <Button
            variant="contained"
            size="small"
            disableElevation
            startIcon={<AddIcon />}
            onClick={() => setLayerOpen(true)}
            sx={{
              fontSize: 13,
              py: 0.4,
              px: 1.25,
              borderRadius: 1,
              bgcolor: DB_RED,
              '& .MuiButton-startIcon': { mr: 0.5 },
              '&:hover': { bgcolor: DB_RED_HOVER },
            }}
          >
            Add New Project
          </Button>
        </Box>
      </Box>

      <FilterBar filters={filters} onChange={setFilters} />

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        {/* View switcher tabs (icon buttons) + result count on the right */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
            pr: 1.5,
          }}
        >
          <Tabs
            value={view}
            onChange={(_, v) => setView(v)}
            sx={{ minHeight: 44 }}
          >
            <Tab icon={<GridViewOutlinedIcon />} sx={{ minWidth: 56 }} />
            <Tab icon={<ViewListOutlinedIcon />} sx={{ minWidth: 56 }} />
            <Tab icon={<TableChartOutlinedIcon />} sx={{ minWidth: 56 }} />
          </Tabs>

          <Tooltip title={`Showing ${visible.length} out of ${total} projects`}>
            <Typography
              component="span"
              sx={{
                fontSize: 12,
                fontVariantNumeric: 'tabular-nums',
                color: 'text.secondary',
                fontWeight: visible.length !== total ? 600 : 400,
                cursor: 'default',
                whiteSpace: 'nowrap',
              }}
            >
              {visible.length} / {total}
            </Typography>
          </Tooltip>
        </Box>

        <Box sx={{ p: 2.5 }}>
          {visible.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ py: 6, textAlign: 'center' }}
            >
              No projects match the current filters.
            </Typography>
          ) : (
            // Grid view is the one built out; list/table are placeholders.
            <Grid container spacing={2}>
              {visible.map((p) => (
                <Grid key={p.id} item xs={12} sm={6} md={4}>
                  <ProjectCard project={p} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>

      <AddLayerDialog
        open={layerOpen}
        onClose={() => setLayerOpen(false)}
        onCreate={(layer) => console.log('create layer', layer)}
      />
    </Box>
  )
}
