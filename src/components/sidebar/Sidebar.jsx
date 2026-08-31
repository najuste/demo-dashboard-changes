import { useState } from 'react'
import { Box, Divider, List, Typography } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import AddIcon from '@mui/icons-material/Add'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import { navy } from '../../theme.js'
import { clients, projects } from '../../data/projects.js'
import NavItem from './NavItem.jsx'
import EntityPicker from './EntityPicker.jsx'
import SectionLabel from './SectionLabel.jsx'
import CollapsibleSection from './CollapsibleSection.jsx'
import SidebarUser from './SidebarUser.jsx'

const DRAWER_WIDTH = 264

// A hairline in the same colour as the sidebar dividers — used to frame the
// project group so it reads as one unit without a heavy fill.
const GROUP_BORDER = 'rgba(255,255,255,0.06)'

// Organism: assembles the sidebar from its atomic parts — a brand header, the
// client picker, top-level nav, and a grouped Project zone (picker + settings
// + viewers).
export default function Sidebar({ page, onNavigate }) {
  const [client, setClient] = useState('c1')
  const [project, setProject] = useState('') // empty = no project chosen yet
  const [mgmtOpen, setMgmtOpen] = useState(true)
  const [controllingOpen, setControllingOpen] = useState(true)
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
      {/* Header — brand + client picker. Kept outside the scroll region so the
          active client stays visible no matter how far the nav is scrolled. */}
      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>X2BIM</Typography>
      </Box>
      <Box sx={{ px: 1, pb: 1.5 }}>
        <EntityPicker
          value={client}
          onChange={setClient}
          options={clients}
          placeholder="Select a client"
          searchPlaceholder="Search clients…"
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      {/* Scrollable nav region: items stack from the top; the account row below
          stays pinned to the bottom regardless of how much lives here. */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
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
          project-scoped control lives inside one bordered group so it reads as
          belonging together. */}
      <CollapsibleSection
        label="Project"
        open={projectOpen}
        onToggle={() => setProjectOpen((p) => !p)}
        containerSx={{ mx: 0.5, mb: 1, borderRadius: 1, border: `1px solid ${GROUP_BORDER}` }}
      >
      <Box
        sx={{
          pl: 1,
          pr: 0.5,
          pb: 0.5,
        }}
      >
        {projects.length > 0 ? (
          // Projects exist → let the user pick one.
          <EntityPicker
            value={project}
            onChange={setProject}
            options={projects}
            placeholder="Select a project"
            searchPlaceholder="Search projects…"
          />
        ) : (
          // No projects yet → offer to create the first one.
          <List sx={{ py: 0.5 }}>
            <NavItem
              icon={<AddIcon fontSize="small" />}
              label="Add new project"
              onClick={() => onNavigate('dashboard')}
            />
          </List>
        )}

        {/* Project-scoped items only appear once a project is chosen. */}
        {hasProject && (
          <>
            <List sx={{ py: 0.5 }}>
              <NavItem
                icon={<SettingsOutlinedIcon fontSize="small" />}
                label="Project Settings"
                active={page === 'settings'}
                onClick={() => onNavigate('settings')}
              />
            </List>

            {/* Viewers — a smaller inset box. */}
            <Box
              sx={{
                borderRadius: 1,
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
                <List dense sx={{ py: 0.25 }}>
                  {viewers.map((v) => (
                    <NavItem
                      key={v}
                      dense
                      icon={<VisibilityOutlinedIcon fontSize="small" />}
                      label={`Viewer ${v}`}
                      active={page === `viewer-${v}`}
                      onClick={() => onNavigate(`viewer-${v}`)}
                    />
                  ))}
                </List>
              </CollapsibleSection>
            </Box>
          </>
        )}
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

      {/* Controlling — collapsible */}
      <CollapsibleSection
        label="Controlling"
        open={controllingOpen}
        onToggle={() => setControllingOpen((p) => !p)}
      >
        <List sx={{ py: 0.5 }}>
          <NavItem
            icon={<MemoryOutlinedIcon fontSize="small" />}
            label="Processing"
            active={page === 'processing'}
            onClick={() => onNavigate('processing')}
          />
          <NavItem
            icon={<PaidOutlinedIcon fontSize="small" />}
            label="Credits"
            active={page === 'credits'}
            onClick={() => onNavigate('credits')}
          />
          <NavItem
            icon={<BusinessOutlinedIcon fontSize="small" />}
            label="Clients"
            active={page === 'clients'}
            onClick={() => onNavigate('clients')}
          />
        </List>
      </CollapsibleSection>
      </Box>

      {/* Pinned to the bottom at their own fixed height: Help, then the account row. */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <List sx={{ py: 0.5 }}>
          <NavItem
            icon={<HelpOutlineOutlinedIcon fontSize="small" />}
            label="Help"
            active={page === 'help'}
            onClick={() => onNavigate('help')}
          />
        </List>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        {/* User — avatar, name + role, opens a small side menu */}
        <SidebarUser name="Jane Doe" role="Administrator" seed="user-jane" />
      </Box>
    </Box>
  )
}

export { DRAWER_WIDTH }
