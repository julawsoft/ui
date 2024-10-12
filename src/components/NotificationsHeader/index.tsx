import { useEffect } from 'react'
import { Bell, Gear } from 'phosphor-react'

import {
  Menu,
  MenuButton,
  MenuList,
  Text,
  Flex,
  Box,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react'

export function NotificationsHeaderComponent(props: any) {
  // const image = user.employee[Employee.image]

  // const baseUrl = import.meta.env.VITE_URL_STATIC_FILES

  useEffect(() => {}, [])

  return (
    <Menu>
      <MenuButton
        _hover={{
          color: 'colab.primary',
        }}
      >
        <Bell size={22} />
      </MenuButton>
      <MenuList>
        <Flex
          p={2}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          w={'250px'}
        >
          <Flex
            justifyContent={'space-between'}
            w={'100%'}
            alignItems={'center'}
            m={1}
          >
            <Text fontSize={'14px'}>Notificações</Text>
            <Box>
              <Gear cursor={'pointer'} />
            </Box>
          </Flex>
          <Divider />
          <SimpleGrid p={2}>
            <Text fontSize={12} fontWeight={'medium'}>
              Nenhuma notificação
            </Text>
          </SimpleGrid>
        </Flex>
      </MenuList>
    </Menu>
  )
}
