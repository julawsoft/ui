import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
  isFronted?: boolean
}

export function Main({ children, isFronted = false }: MainProps) {
  return (
    <Flex
      minH="90vh"
      width="100%"
      bg="white"
      rounded="lg"
      flexDirection="column"
      gap={8}
      boxShadow="2xl"
    >
      {children}
    </Flex>
  )
}
