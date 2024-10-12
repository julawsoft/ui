import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  HStack,
  Spacer,
  Checkbox,
  Center,
} from '@chakra-ui/react'

export function WorkingWeek() {
  return (
    <Flex
      w="100%"
      h="100%"
      p={2}
      bg="white"
      borderRadius="10px"
      overflow="hidden"
      border="1px solid #E5DACF"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap="10px"
    >
      <HStack p={2} alignSelf="stretch" justify="flex-start">
        <Flex justify="flex-start" align="center">
          <Text
            color="#5A5A66"
            fontSize="24px"
            fontFamily="Roboto"
            fontWeight="400"
          >
            Semana de trabalho
          </Text>
        </Flex>
        <Spacer />
        <Button
          px="16px"
          py="8px"
          borderRadius="5px"
          overflow="hidden"
          border="1px solid #C2912E"
          gap={2}
          bg="transparent"
          color="#C2912E"
          fontSize="20px"
          fontFamily="Roboto"
          fontWeight="400"
        >
          Ir para as Definições
        </Button>
      </HStack>

      <VStack
        flex="1"
        p={2}
        justify="flex-start"
        alignSelf="stretch"
        align="flex-start"
        gap="15px"
      >
        <Box alignSelf="stretch" py={2}>
          <Text
            color="#5A5A66"
            fontSize="14px"
            fontFamily="Roboto"
            fontWeight="600"
            textTransform="uppercase"
          >
            Usando o padrão da empresa
          </Text>
        </Box>
        <VStack
          alignSelf="stretch"
          py={2}
          justify="flex-start"
          align="flex-start"
          gap={2.5}
        >
          {['AM', 'PM'].map((time) => (
            <HStack key={time} alignItems="flex-end">
              <Text
                color="#5A5A66"
                fontSize="15px"
                fontFamily="Roboto"
                fontWeight="600"
                textTransform="uppercase"
              >
                {time}
              </Text>
              <Flex justify="flex-start" align="flex-end" gap="8px">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                  (day) => (
                    <VStack key={day} align="center" gap="2px">
                      <Text
                        color="#5A5A66"
                        fontSize="16px"
                        fontFamily="Roboto"
                        fontWeight="600"
                        textTransform="uppercase"
                      >
                        {day.slice(0, 3)}
                      </Text>
                      <Box position="relative" w="51px" h="50px">
                        <Center
                          w="34px"
                          h="34px"
                          position="absolute"
                          left="8px"
                          top="8px"
                          bg="#C2912E"
                          borderRadius="5px"
                        >
                          <Checkbox
                            _focus={{ border: 'none', boxShadow: 'none' }}
                            _hover={{ border: 'none' }}
                            colorScheme="white"
                            size="xl"
                          />
                        </Center>
                      </Box>
                    </VStack>
                  ),
                )}
              </Flex>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Flex>
  )
}

export default WorkingWeek
