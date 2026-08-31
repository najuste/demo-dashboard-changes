import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
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
import CircleIcon from '@mui/icons-material/Circle'

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
        '&:hover': { boxShadow: 4, borderColor: 'primary.main' },
      }}
    >
      {/* Card body navigates to the viewer (irrelevant for this mockup) */}
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://picsum.photos/180/180"
          alt="project img"
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, py: 0.5 }}>
        <Tooltip title="Project info">
          <IconButton size="small">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Processes">
          <IconButton size="small">
            <MemoryOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="User permissions">
          <IconButton size="small">
            <GroupOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  )
}
