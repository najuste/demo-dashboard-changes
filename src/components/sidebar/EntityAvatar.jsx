import { Avatar } from '@mui/material'

// Placeholder imagery until real client/project/user avatars exist.
export const avatarSrc = (seed) => `https://picsum.photos/seed/${seed}/80`

// Atom: a square-ish, rounded entity image. Rendered small inside menus and
// large (leaning rectangular) in the client/project pickers.
export default function EntityAvatar({ seed, width = 24, height = 24, radius = 0.75 }) {
  return (
    <Avatar
      variant="rounded"
      src={avatarSrc(seed)}
      sx={{ width, height, borderRadius: radius, flexShrink: 0 }}
    />
  )
}
