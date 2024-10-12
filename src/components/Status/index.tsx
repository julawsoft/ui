import { Badge, Text } from '@chakra-ui/react'

interface StatusProps {
  description?: string
  type: 'success' | 'warning' | 'danger'
}

const COLORS = {
  success: '#38A169',
  warning: '#F2B412',
  danger: '#E53E3E',
}

export function Status({ description, type }: StatusProps) {
  return (
    <Badge variant="solid" bg={COLORS[type]} px={12} py={2} borderRadius={3}>
      <Text
        as="span"
        textTransform="capitalize"
        fontSize="14px"
        fontWeight="normal"
        color={type === 'warning' ? '#131313' : '#fff'}
      >
        {description}
      </Text>
    </Badge>
  )
}
