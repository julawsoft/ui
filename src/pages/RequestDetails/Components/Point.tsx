import { Flex } from '@chakra-ui/react'

export function Point() {
  return (
    <>
      <Flex
        alignItems={'center'}
        width={'100px'}
        p={2}
        borderRadius={2}
        textAlign={'center'}
        justifyContent={'center'}
        lineHeight={'10px'}
      >
        <Flex
          fontSize={32}
          color={'#AFB6C2'}
          alignItems={'center'}
          width={'5px'}
          height={'5px'}
          borderRadius={'50%'}
          bgColor={'#AFB6C2'}
        ></Flex>
      </Flex>
    </>
  )
}
