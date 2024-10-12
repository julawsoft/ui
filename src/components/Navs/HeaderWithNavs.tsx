import { ReactNode } from 'react'
import { Flex, Text, Avatar } from '@chakra-ui/react'
import { getFirstAndLastName } from '../../utils/userName'

interface HeaderWithNavProps {
  title: string | undefined
  children?: ReactNode
  hasAvatar?: boolean
  image?: string
  borderBox?: string
}

export function HeaderWithNav({
  title,
  hasAvatar = false,
  children,
  image,
  borderBox = '6px'
}: HeaderWithNavProps) {
  const name = getFirstAndLastName(title || '')

  return (
    <Flex
      justify="center"
      alignItems="center"
      gap={4}
      py={4}
      position="relative"
      bgColor={'#1d212a'}
      color={'#fff'}
      mb={2}
      borderRadius={borderBox}
    >
      {hasAvatar && <Avatar name={name} size="sm" src={image} />}
      <Text fontSize={'lg'} fontWeight={'medium'}>
        {title}
      </Text>

      {children}
    </Flex>
  )
}
