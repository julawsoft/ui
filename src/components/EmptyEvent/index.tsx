import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { User } from 'phosphor-react'

export interface EmptyEventProps {
  icon?: ReactNode
  title: string
  bgColor?: string
}

export function EmptyEvent({ icon, title, bgColor }: EmptyEventProps) {
  return (
    <Flex h={'35px'} bg={bgColor ?? 'f2f2f2'}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        width={'72px'}
        color={'gray.500'}
      >
        {icon ?? <User size={24} />}
      </Flex>
      <Flex alignItems={'center'}>{`${title}`}</Flex>
    </Flex>
  )
}
