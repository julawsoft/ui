import { NavLink, useLocation } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

interface LinkProps {
  name: string
  href: string
}

interface NavbarProps {
  links: LinkProps[]
}

export function Navbar({ links }: NavbarProps) {
  const location = useLocation()

  return (
    <Flex
      bg="gray.900"
      h="14"
      color={'white'}
      align="center"
      justify="center"
      gap="8"
      fontSize="md"
      overflow="auto"
    >
      {links.map((link) => {
        return (
          <NavLink
            to={link.href}
            key={link.name}
            style={({ isActive }) =>
              isActive
                ? { color: '#C2912E', fontWeight: 'bold' }
                : { color: '#fff' }
            }
          >
            {link.name}
          </NavLink>
        )
      })}
    </Flex>
  )
}
