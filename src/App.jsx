import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'

// Only the dashboard is wired up; other destinations show a placeholder.
function Placeholder({ title }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2">Not part of this mockup yet.</Typography>
    </Box>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar page={page} onNavigate={setPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 4, overflow: 'auto' }}>
        {page === 'dashboard' ? (
          <Dashboard />
        ) : (
          <Placeholder title={page.replace('-', ' ')} />
        )}
      </Box>
    </Box>
  )
}
