import { Box, Flex } from '@chakra-ui/react'
import { List } from 'phosphor-react'
import { UserComponent } from '../User'
import { SettingsHeaderComponent } from '../SettingsHeader'
import { NotificationsHeaderComponent } from '../NotificationsHeader'
import useColabContext from '../../context_api'

export function Header() {
  const { colabProvider, setData } = useColabContext()

  const handleSideBar = () => {
    const {
      menu: { sidebarIsActive, ...rest2 },
      ...rest
    } = colabProvider

    const updatedColabProvider = {
      menu: {
        sidebarIsActive: !sidebarIsActive,
        ...rest2,
      },
      ...rest,
    }
    setData({
      ...updatedColabProvider,
    })
  }

  return (
    <Flex height={'75px'}>
      <Flex width={'100%'} alignItems={'center'} px={4}>
        <List size={32} onClick={handleSideBar} cursor={'pointer'} />
      </Flex>
      <Flex
        width={'350px'}
        px={4}
        alignItems={'center'}
        gap={2}
        justifyContent={'flex-end'}
      >
        <Flex>
          <SettingsHeaderComponent />
        </Flex>
        <Flex>
          <NotificationsHeaderComponent />
        </Flex>
        <Box height={'48px'} border={'1px solid #c3c3c3'}></Box>
        <Flex>
          <UserComponent />
        </Flex>
      </Flex>
    </Flex>
  )
}
