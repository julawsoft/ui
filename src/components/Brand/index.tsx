import { Divider } from '../Divider'
import { Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface BrandProps {
  icon?: ReactNode
  title: string
  description: string
  position: 'center' | 'left' | 'right'
}

export function Brand({ title, description, icon, position }: BrandProps) {
  return (
    <Flex justify={position} my={6}>
      <Flex maxWidth={'440px'} align={position} flexDirection="column" gap={4}>
        {icon}
        <Text fontSize={'3xl'} fontWeight="normal">
          {title}
        </Text>
        <Text textAlign={position} fontSize="lg" color={'gray.400'}>
          {description}
        </Text>
        <Divider />
      </Flex>
    </Flex>
  )
}
