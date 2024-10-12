import { Box, Flex, Text } from "@chakra-ui/react";

export function NotFound() {
  return (
    <Flex bgColor={'#25282A'}  height={'100vh'} w={'100vw'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
      <Box>
        <Text color={'#F2C112'} fontSize={'12em'}>404</Text>
        <Text color={'#F2C112'} fontSize={'3em'}>Página não encontrada!</Text>
      </Box>
    </Flex>
    )
}
