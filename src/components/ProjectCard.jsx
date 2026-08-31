import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

export default function ProjectCard({ project }) {
  const running = project.processesRunning ?? 0
  const failed = project.processesFailed ?? 0
  const finished = project.processesFinished ?? 0
  const total = running + failed + finished

  // Status → chip color. Only non-zero counts get a chip so cards stay clean.
  const statusChips = [
    { count: running, label: 'running', color: 'success' },
    { count: failed, label: 'failed', color: 'warning' },
    { count: finished, label: 'finished', color: 'info' },
  ].filter((s) => s.count > 0)

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 0.15s, border-color 0.15s',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(15,27,45,0.06)',
          borderColor: 'text.disabled',
        },
      }}
    >
      {/* Card body navigates to the viewer (irrelevant for this mockup) */}
      <CardActionArea sx={{ flexGrow: 1 }}>
        {/* Placeholder thumbnail — a simple icon, since real project images
            often aren't available. */}
        <Box
          sx={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            color: 'grey.400',
          }}
        >
          <ImageOutlinedIcon sx={{ fontSize: 44 }} />
        </Box>
        <CardContent sx={{ p: 1.75, '&:last-child': { pb: 1.75 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 0.75,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              {project.name}
            </Typography>
            {/* <CircleIcon
              sx={{
                fontSize: 10,
                color: project.active ? 'success.main' : 'grey.400',
              }}
            /> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 0.75,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {statusChips.map((s) => (
              <Chip
                key={s.label}
                size="small"
                color={s.color}
                variant="outlined"
                label={`${s.count} ${s.label}`}
              />
            ))}
            {total === 0 && (
              <Chip size="small" variant="outlined" label="No processes" />
            )}
          </Box>

          {/* Total processes as a right-aligned link to the processes view */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link
              component="button"
              underline="always"
              color="text.secondary"
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: 12.5,
                fontWeight: 500,
              }}
            >
              <MemoryOutlinedIcon sx={{ fontSize: 15 }} />
              {total} processes
            </Link>
          </Box>
        </CardContent>
      </CardActionArea>

      <Divider />

      {/* Quick navigation actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.75, px: 1, py: 0.75 }}>
        <Tooltip title="Project info">
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Processes">
          <IconButton>
            <MemoryOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="User permissions">
          <IconButton>
            <GroupOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  )
}
