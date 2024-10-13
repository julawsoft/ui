import { Flex, Text } from '@chakra-ui/react'

import useColabContext from '../../context_api'

export function Home() {

  const { colabProvider } = useColabContext()

  return (
    <>
      <Flex minHeight={'100%'} width={'100%'} flexDirection={'column'} gap={4}>
        <Text>Home do APP SEC</Text>
        <Text>{colabProvider.user.name}</Text>
      </Flex>
    </>
  )
}
