import { Flex, Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export interface LinkProps {
  href: string
  name: string
}

interface NavbarVerticalReportsProps {
  data: LinkProps[]
}

export function NavbarVerticalReports({ data }: NavbarVerticalReportsProps) {
  return (
    <Flex>
      <Flex
        px={8}
        flexDirection="column"
        gap={6}
        minH="100%"
        borderRight="1px solid #ccc"
      >
        {data.map((link) => {
          return (
            <Link
              key={link.href}
              as={NavLink}
              to={link.href}
              fontFamily={'Poppins'}
              fontWeight="medium"
              _activeLink={{
                color: '#c2912e',
                fontWeight: 'bold',
                _after: {
                  content: '""',
                  width: '8px',
                  height: '8px',
                  display: 'inline-block',
                  borderRadius: '50%',
                  background: '#c2912e',
                  marginLeft: '8px',
                },
              }}
              _hover={{ textDecoration: 'none', color: '#c2912e' }}
            >
              {link.name}
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}
