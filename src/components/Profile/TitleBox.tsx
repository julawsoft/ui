import { Flex } from '@chakra-ui/react'

export function TitleBox({ children, mb }) {
  return (
    <Flex flexDirection={'column'} mb={mb}>
      {children}
    </Flex>
  )
}
