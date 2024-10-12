import { useEffect } from 'react'
import { Gear } from 'phosphor-react'

import { Menu, MenuButton, MenuList, Flex, Text } from '@chakra-ui/react'

export function SettingsHeaderComponent(props: any) {
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
        <Gear size={22} />
      </MenuButton>
      <MenuList>
        <Flex p={2} justifyContent={'center'} alignItems={'center'}>
          <Text>Configurações</Text>
        </Flex>
      </MenuList>
    </Menu>
  )
}
