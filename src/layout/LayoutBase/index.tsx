import { useEffect } from 'react'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import { Outlet } from 'react-router-dom'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import useColabContext from '../../context_api'
import { ToastSessionNotify } from '../../components/ToastSessionNotify'
import { tokenHasExpired } from '../../utils/session/verify'

export function LayoutBase() {
  useEffect(() => {})
  const { colabProvider } = useColabContext()

  console.log('>>', colabProvider.auth.accessToken)

  return (
    <Grid
      templateColumns={colabProvider.menu.sidebarIsActive ? '250px 1fr' : '1fr'}
      color={'#15171C'}
      bgColor={'#ffffff'}
    >

     {
      tokenHasExpired(colabProvider.auth.accessToken) ?   <ToastSessionNotify /> : null
     }
    
      <GridItem w="100%">
        <Sidebar></Sidebar>
      </GridItem>
      <GridItem w="100%">
        <Header></Header>
        <Flex borderRadius={8} m={4} minHeight={'85vh'} maxW={'1920px'}>
          <Box width="100%" maxW={'1920px'}>
            <Outlet />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}
