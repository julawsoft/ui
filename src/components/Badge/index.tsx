import { FC, ReactNode } from 'react'
import { Badge as BadgeChacra } from '@chakra-ui/react'

interface BadgeProps {
  children: ReactNode
  color: string
}
const Badge: FC<BadgeProps> = ({ children, color }) => {
  return (
    <BadgeChacra
      colorScheme={color}
      style={{ padding: '8px 32px', borderRadius: '32px' }}
    >
      {children}
    </BadgeChacra>
  )
}

export default Badge
