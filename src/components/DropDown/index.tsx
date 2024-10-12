import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/react'

interface DropProsp {
  iconOrText?: any
  children: any
}

export function DropDown({ iconOrText, children }: DropProsp) {
  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>{iconOrText}</MenuButton>
        <MenuList minWidth="240px">{children}</MenuList>
      </Menu>
    </>
  )
}
