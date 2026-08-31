import { useState } from 'react'
import { Box, Divider, List, Typography } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import { navy } from '../../theme.js'
import { clients, projects } from '../../data/projects.js'
import NavItem from './NavItem.jsx'
import EntityPicker from './EntityPicker.jsx'
import SectionLabel from './SectionLabel.jsx'
import CollapsibleSection from './CollapsibleSection.jsx'
import SidebarUser from './SidebarUser.jsx'

const DRAWER_WIDTH = 264

// The faint tint that fills the project group. Shared with the project picker's
// dropdown so the open menu reads as the same surface as its container.
const PROJECT_TINT = 'rgba(255,255,255,0.03)'

// Organism: assembles the sidebar from its atomic parts — a brand header, the
// client picker, top-level nav, and a grouped Project zone (picker + settings
// + viewers).
export default function Sidebar({ page, onNavigate }) {
  const [client, setClient] = useState('c1')
  const [project, setProject] = useState('') // empty = no project chosen yet
  const [mgmtOpen, setMgmtOpen] = useState(true)
  const [projectOpen, setProjectOpen] = useState(true)
  const [viewersOpen, setViewersOpen] = useState(true)

  const hasProject = Boolean(project)
  const viewers = ['A', 'B', 'C']

  return (
    <Box
      component="nav"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        bgcolor: navy.base,
        color: navy.textBright,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 3, py: 2.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>X2BIM</Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      {/* Client — a full-width picker, not a nav destination */}
      {/* <SectionLabel>Client</SectionLabel> */}
      <Box sx={{ px: 0.5, pb: 1 , pt: 1}}>
        <EntityPicker
          value={client}
          onChange={setClient}
          options={clients}
          placeholder="Select a client"
          searchPlaceholder="Search clients…"
        />
      </Box>

      {/* Primary nav */}
      <List sx={{ py: 0.5 }}>
        <NavItem
          icon={<DashboardOutlinedIcon fontSize="small" />}
          label="Projects Dashboard"
          active={page === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
      </List>

      {/* Project — the picker reuses the same component as Client, and every
          project-scoped control lives inside one lightly-tinted group so it
          reads as belonging together. */}
      <CollapsibleSection
        label="Project"
        open={projectOpen}
        onToggle={() => setProjectOpen((p) => !p)}
      >
      <Box
        sx={{
          mx: 0.5,
          mb: 1,
          p: 0.5,
          borderRadius: 1,
          bgcolor: PROJECT_TINT,
        }}
      >
        <EntityPicker
          value={project}
          onChange={setProject}
          options={projects}
          placeholder="Pick a project"
          searchPlaceholder="Search projects…"
          menuBg={PROJECT_TINT}
        />

        <List sx={{ py: 0.5 }}>
          <NavItem
            icon={<SettingsOutlinedIcon fontSize="small" />}
            label="Project Settings"
            active={page === 'settings'}
            disabled={!hasProject}
            onClick={() => onNavigate('settings')}
          />
        </List>

        {/* Viewers — a smaller inset box; only usable once a project exists. */}
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: navy.raised,
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <CollapsibleSection
            label="Viewers"
            open={viewersOpen}
            onToggle={() => setViewersOpen((p) => !p)}
            px={2}
          >
            {hasProject ? (
              <List dense sx={{ py: 0.25 }}>
                {viewers.map((v) => (
                  <NavItem
                    key={v}
                    dense
                    icon={<VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                    label={`Viewer ${v}`}
                    active={page === `viewer-${v}`}
                    onClick={() => onNavigate(`viewer-${v}`)}
                  />
                ))}
              </List>
            ) : (
              <Typography
                sx={{
                  px: 2,
                  pt: 0.5,
                  pb: 1.5,
                  fontSize: 12,
                  fontStyle: 'italic',
                  color: navy.textDim,
                }}
              >
                Select a project to load its viewers.
              </Typography>
            )}
          </CollapsibleSection>
        </Box>
      </Box>
      </CollapsibleSection>

            {/* Management — collapsible */}
      <CollapsibleSection
        label="Management"
        open={mgmtOpen}
        onToggle={() => setMgmtOpen((p) => !p)}
      >
        <List sx={{ py: 0.5 }}>
          <NavItem
            icon={<GroupOutlinedIcon fontSize="small" />}
            label="User Management"
            active={page === 'user-management'}
            onClick={() => onNavigate('user-management')}
          />
          <NavItem
            icon={<StorageOutlinedIcon fontSize="small" />}
            label="External Data Sources"
            active={page === 'external-data'}
            onClick={() => onNavigate('external-data')}
          />
        </List>
      </CollapsibleSection>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      {/* User — avatar, name + role, opens a small side menu */}
      <SidebarUser name="Jane Doe" role="Administrator" seed="user-jane" />
    </Box>
  )
}

export { DRAWER_WIDTH }
