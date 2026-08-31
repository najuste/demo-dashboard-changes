import { Avatar } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

// Placeholder imagery until real client/project/user avatars exist.
export const avatarSrc = (seed) => `https://picsum.photos/seed/${seed}/80`

// Atom: a square-ish, rounded entity thumbnail. Rendered small inside menus and
// large (leaning rectangular) in the client/project pickers. Real thumbnails
// rarely exist yet, so it shows a simple image icon rather than a loaded photo.
export default function EntityAvatar({ width = 24, height = 24, radius = 0.75 }) {
  return (
    <Avatar
      variant="rounded"
      sx={{
        width,
        height,
        borderRadius: radius,
        flexShrink: 0,
        bgcolor: 'rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.45)',
      }}
    >
      <ImageOutlinedIcon sx={{ fontSize: Math.min(width, height) * 0.6 }} />
    </Avatar>
  )
}
