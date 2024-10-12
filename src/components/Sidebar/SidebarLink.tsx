import React, { useState } from 'react'
import {
  Box,
  Link as ChakraLink,
  HStack,
  LinkProps,
  Spacer,
} from '@chakra-ui/react'
import { Minus, Plus } from 'phosphor-react'

interface SidebarItem {
  path: string
  title: string
  icon: React.ReactElement
  subNav?: SidebarItem[]
  goTo?: (url: string) => void
}

interface SidebarLinkProps extends LinkProps {
  to: string
  onClick: () => void
}

function SidebarLink({ to, onClick, children }: SidebarLinkProps) {
  return (
    <ChakraLink
      display="flex"
      color="#e1e9fc"
      onClick={onClick}
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      height="60px"
      textDecoration="none"
      fontSize="18px"
      transition={'all 0.1s'}
      _hover={{
        background: '#FFEFCF',
        color: '#D1A856',
        borderRight: '4px solid #C2912E',
        cursor: 'pointer',
        transform: 'all 0.3s',
      }}
      //   href={to}
    >
      {children}
    </ChakraLink>
  )
}

function SidebarLabel({ children }) {
  return <span style={{ marginLeft: '16px' }}>{children}</span>
}

function DropdownLink({ to, children }) {
  return (
    <ChakraLink
      background="#414757"
      height="60px"
      paddingLeft="3rem"
      display="flex"
      alignItems="center"
      textDecoration="none"
      color="#f5f5f5"
      fontSize="18px"
      transition={'all 0.1s'}
      _hover={{
        background: '#D1A856',
        color: '#FFFFFF',
        cursor: 'pointer',
        transform: 'all 0.3s',
      }}
      //   href={to}
    >
      {children}
    </ChakraLink>
  )
}

const SubMenu: React.FC<{
  item: SidebarItem
  redirectTo: (path: string) => void
}> = ({ item, redirectTo }) => {
  const [subnav, setSubnav] = useState(false)

  const action = () => {
    if (item.subNav) {
      showSubnav()
    } else {
      redirectTo(item.path)
    }
  }

  const showSubnav = () => {
    setSubnav(!subnav)
  }

  return (
    <>
      <SidebarLink to={item.path} onClick={action}>
        <HStack spacing={0} gap={0}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </HStack>
        <Spacer />
        <Box>{item.subNav && (subnav ? <Minus /> : <Plus />)}</Box>
      </SidebarLink>
      {subnav &&
        item.subNav?.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          )
        })}
    </>
  )
}

export default SubMenu
