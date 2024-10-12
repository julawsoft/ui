import { ReactNode } from 'react'
import { Flex, Text } from '@chakra-ui/react'

interface ICardProfile {
  children: ReactNode
  title: string
}

export const CardProfile = ({ children, title }: ICardProfile) => {
  return (
    <>
      <Text fontSize={'1.2em'}>{title}</Text>
      <Flex border={'1px solid #c3c3c3'}>{children}</Flex>
    </>
  )
}
