import { Text } from '@chakra-ui/react'

export function Title({ title }) {
  return (
    <Text textTransform={'uppercase'} fontWeight={'medium'}>
      {title}
    </Text>
  )
}
