import { Flex, Text } from '@chakra-ui/react'
import BeatLoader from 'react-spinners/BeatLoader'

export function LoaderLocal() {
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      bgColor={'#f2f2f2'}
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <BeatLoader
          color="#C2912E"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Text fontSize={'.7rem'}>Carregando...</Text>
      </Flex>
    </Flex>
  )
}
