import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CardFormProps {
  children: ReactNode
  padding?: number
  margin?: number
  borderRadius?: number
}

export function CardForm({
  children,
  padding = 4,
  margin = 2,
  borderRadius = 4,
}: CardFormProps) {
  return (
    <Flex
      minWidth="50%"
      bg="white"
      flexDirection={'column'}
      p={padding}
      my={margin}
      borderRadius={borderRadius}
    >
      {children}
    </Flex>
  )
}
