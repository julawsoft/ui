import { Box } from '@chakra-ui/react'

interface SeparatorCircleProps {
  color?: 'gray.500' | 'yellow.500' | 'green.500'
}

export function SeparatorCircle({ color = 'gray.500' }: SeparatorCircleProps) {
  return <Box w="5px" h="5px" bg={color} borderRadius={4} />
}
