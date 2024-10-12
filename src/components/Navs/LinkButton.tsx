import { ReactNode } from 'react'
import { Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

interface LinkButtonProps {
  text: string
  color: 'gray.200' | 'yellow.400'
  href: string
  icon?: ReactNode
}

export function LinkButton({ text, color, icon, href }: LinkButtonProps) {
  return (
    <Link
      as={NavLink}
      to={href}
      border="2px"
      borderColor={color}
      borderRadius={24}
      px={4}
      py={1}
      display="flex"
      gap={2}
      color={color}
      fontSize={'14px'}
      fontWeight="bold"
      _hover={{
        textDecoration: 'none',
      }}
    >
      {icon}
      {text}
    </Link>
  )
}
