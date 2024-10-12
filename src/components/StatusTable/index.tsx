import { Badge, Text } from '@chakra-ui/react'

interface StatusTableProps {
  status: number
  description?: string
}

export function StatusTable({ status, description }: StatusTableProps) {
  switch (status) {
    case 0:
      return (
        <Badge colorScheme="blue" px={4} py={1} borderRadius={8}>
          <Text fontSize="8px">
            {!description ? 'Cancelado' : description}
          </Text>
        </Badge>
      )
    case 1:
      return (
        <Badge bg="#ffe4bc" px={3} py={1} borderRadius={8}>
          <Text color="#e38a05" fontSize="10px">
            {!description ? 'Pendente' : description}
          </Text>
        </Badge>
      )
    case 2:
      return (
        <Badge bg="#adf3c0" px={4} py={1} borderRadius={8}>
          <Text color="#42694d" fontSize="8px">
            {!description ? 'Emitido' : description}
          </Text>
        </Badge>
      )
    case 3:
      return (
        <Badge colorScheme="red" px={4} py={1} borderRadius={12}>
          <Text fontSize="10px">
            {!description ? 'Rejeitado' : description}
          </Text>
        </Badge>
      )

    default:
      return (
        <Badge bg="#e4e4e4" px={4} py={1} borderRadius={12}>
          <Text color="#4c4c4c" fontSize="10px">
            {!description ? 'Default' : description}
          </Text>
        </Badge>
      )
  }
}
