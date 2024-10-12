import {
  Box,
  Link as ChakraLink,
  Flex,
  Text,
  Image,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react'
// import { MenuItem } from '../MenuItem'
import useColabContext from '../../context_api'
import { useNavigate } from 'react-router-dom'
// import { ROUTES } from '../../routes/constants'

import iconColob from '../../assets/images/icon/favicon.png'
import { Question } from 'phosphor-react'
import { menusPermissions } from './menusPermission'
import useGetUserPermissions from '../../hooks/useGetUserPermissions'
import { toast } from 'react-toastify'

export interface SidebarNavProps {
  sidebar: boolean
}

export function Nav({ children }) {
  return (
    <Box
      bg="#15171c"
      height="80px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      {children}
    </Box>
  )
}

export function NavIcon({ to: string, children }) {
  return (
    <ChakraLink
      as="div"
      marginLeft="2rem"
      fontSize="2rem"
      height="80px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      href={'to'}
    >
      {children}
    </ChakraLink>
  )
}

export function SidebarNav({ sidebar, children }) {
  return (
    <Box
      bg="#1d212a"
      width="250px"
      height="100vh"
      display="flex"
      justifyContent="center"
      position="fixed"
      top="0"
      left={sidebar ? '0' : '-100%'}
      transition="all 1s"
      zIndex="10"
      color="#fff"
      padding={'18px'}
    >
      {children}
    </Box>
  )
}

export function SidebarWrap({ children }) {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      {children}
    </Flex>
  )
}

export function SideBarHeader() {
  return (
    <>
      <Box mb={4}>
        <Flex height={'56px'} alignItems={'center'} gap={4} mb={4}>
          <Box>
            <Image
              src={iconColob}
              width={'36px'}
              height={'36px'}
              maxWidth={'100%'}
              alt="Plataforma Colab"
            />
          </Box>
          <Text
            fontSize={'24px'}
            textTransform={'uppercase'}
            fontWeight={'extrabold'}
            fontFamily={'body'}
          >
            {'Colab'}
          </Text>
        </Flex>
        <Divider />
      </Box>
    </>
  )
}

export function SideBarBody({ children }) {
  return (
    <>
      <Flex height={'100%'} flexDirection={'column'} gap={4}>
        {children}
      </Flex>
    </>
  )
}

export function SideBarFooter() {
  return (
    <Flex height={'auto'}>
      <Flex flexDirection={'column'} gap={2} width={'100%'}>
        <Flex
          alignItems={'center'}
          p={2}
          width={'100%'}
          height={'34px'}
          borderRadius={4}
          gap={2}
          cursor={'pointer'}
          onClick={() => toast.info('e-mail: suporte@cetim.ms')}
        >
          <Text>
            {' '}
            <Question size={24} />
          </Text>
          <Text>Ajuda</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function Sidebar() {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const { colabProvider, setData } = useColabContext()
  const navigate = useNavigate()

  const handleMenuItem = (url: string, index: number, isSubMenu: boolean) => {
    navigate(url, { state: { id: colabProvider.user.id } })
    pushMenuUpdate(index, isSubMenu)
  }

  const pushMenuUpdate = (indexPassed: number, isSubMenu: boolean) => {
    const {
      menu: { index, sidebarIsActive, subMenuIndex, ...rest2 },
      ...rest
    } = colabProvider

    const menuUpdated = !isSubMenu
      ? {
          menu: {
            index: indexPassed,
            sidebarIsActive: isMobile ? false : sidebarIsActive,
            subMenuIndex,
            ...rest2,
          },
        }
      : {
          menu: {
            index,
            subMenuIndex: indexPassed,
            sidebarIsActive: isMobile ? false : sidebarIsActive,
            ...rest2,
          },
        }

    const updatedColabProvider = { ...rest, ...menuUpdated }
    setData({ ...updatedColabProvider })
  }

  const userPermissions = useGetUserPermissions()

  return (
    <SidebarNav sidebar={colabProvider.menu.sidebarIsActive}>
      <SidebarWrap>
        <SideBarHeader />
        <SideBarBody>
          <Flex flexDirection={'column'} gap={4}>
            {menusPermissions.map((menu) => {
              if (
                menu.roles?.includes(userPermissions.profile) ||
                !menu.roles ||
                menu.roles.length === 0
              )
                return (
                  <>
                    <Flex
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      p={2}
                      bgColor={
                        menu.index === colabProvider.menu.index
                          ? 'yellow.500'
                          : ''
                      }
                      width={'100%'}
                      height={'34px'}
                      borderRadius={4}
                      key={menu.index}
                    >
                      <Flex
                        gap={3}
                        alignItems={'center'}
                        cursor={'pointer'}
                        width={'100%'}
                        onClick={() =>
                          handleMenuItem(menu.path, menu.index, menu.isSubMenu)
                        }
                      >
                        <Text>{menu.icon}</Text>
                        <Text>{menu.title}</Text>
                      </Flex>
                    </Flex>
                  </>
                )

              return null
            })}
            {/* <Divider />
             <Flex flexDirection={'column'} gap={2}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                p={1}
                width={'100%'}
                borderRadius={4}
                bgColor={'#fbfaf8'}
                flexDirection={'column'}
                color={'#000'}
              >
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  height={'34px'}
                  bgColor={'yellow.400'}
                  width={'100%'}
                  borderRadius={3}
                  p={1}
                  gap={4}
                >
                  <Flex
                    gap={3}
                    alignItems={'center'}
                    cursor={'pointer'}
                    width={'60%'}
                  >
                    <Text>
                      {' '}
                      <Buildings size={24} />
                    </Text>
                    <Text>Empresa</Text>
                  </Flex>
                  <Text>
                    <Minus size={18} />
                  </Text>
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  p={2}
                  width={'100%'}
                  height={'34px'}
                  borderRadius={4}
                >
                  <Flex
                    gap={3}
                    alignItems={'center'}
                    cursor={'pointer'}
                    width={'100%'}
                  >
                    <Text>
                      <UsersFour size={24} />
                    </Text>
                    <Text>Org Chart</Text>
                  </Flex>
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  p={2}
                  width={'100%'}
                  height={'34px'}
                  borderRadius={4}
                >
                  <Flex
                    gap={3}
                    alignItems={'center'}
                    cursor={'pointer'}
                    width={'100%'}
                  >
                    <Text>
                      <User size={24} />
                    </Text>
                    <Text>Departamentos</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex> */}
          </Flex>
        </SideBarBody>
        <SideBarFooter />
      </SidebarWrap>
    </SidebarNav>
  )
}
