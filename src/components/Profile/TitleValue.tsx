import { Text } from '@chakra-ui/react'

export function TitleValue({ value, link, params, onClick }) {
  return (
    <Text
      _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() => onClick(link, params)}
    >
      {value}
    </Text>
  )
}
