import { ReactNode } from 'react'
import { Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

interface CircleLinkProps {
  href: string
  icon: ReactNode
  color: 'gray.200' | 'yellow.400' | 'gray.500'
  state?: any
}

export function CircleLink({ href, icon, color, state }: CircleLinkProps) {
  return (
    <Link
      as={NavLink}
      state={state}
      to={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderColor={color}
      borderRadius={20}
      px={1}
      py={1}
      color={color}
    >
      {icon}
    </Link>
  )
}
