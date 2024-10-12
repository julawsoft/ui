import { Plus } from 'phosphor-react'
import { Flex, Button, Box } from '@chakra-ui/react'

interface ButtonNewProps {
  alignButton: 'end' | 'start'
  name: string
  handleOnClick?: () => void
  type?: 'submit' | 'reset'
  disabled?: boolean
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

export function ButtonNew({
  name,
  handleOnClick,
  alignButton,
  type,
  disabled = false,
  size = 'lg',
}: ButtonNewProps) {
  return (
    <Flex justify={alignButton} my={8}>
      <Button
        disabled={disabled}
        size={size}
        color="#fff"
        colorScheme="yellow"
        onClick={handleOnClick}
        type={type}
      >
        <Box mr={4} bg="yellow.500" p={1} borderRadius={4}>
          <Plus size={20} color="#fff" />
        </Box>
        {name}
      </Button>
    </Flex>
  )
}
