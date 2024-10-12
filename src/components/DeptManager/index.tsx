import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'

export interface DefineDeptManagerProps {
  title: string
  buttonTitle: string
  buttonAction: () => {}
}

export function DeptManager({
  title,
  buttonTitle,
  buttonAction,
}: DefineDeptManagerProps) {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        p={4}
        bg="#EDE6DE"
        borderRadius={10}
        overflow="hidden"
        border="1px solid #E5DACF"
        display="inline-flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={4}
      >
        <VStack
          alignSelf="stretch"
          h={115}
          p={4}
          spacing={4}
          align="flex-start"
        >
          <Text
            w={187}
            h={28}
            color="#5A5A66"
            fontSize="18px"
            fontFamily="Roboto"
            fontWeight="400"
            lineHeight="25.2px"
            wordBreak="break-word"
          >
            {title}
          </Text>
          <Flex
            alignSelf="stretch"
            h={45}
            px={4}
            py={2}
            bg="rgba(255, 255, 255, 0.44)"
            borderRadius={6}
            overflow="hidden"
            border="1px solid #C2912E"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Button
              color="#C2912E"
              fontSize="20px"
              fontFamily="Roboto"
              fontWeight="600"
              lineHeight="32px"
              wordBreak="break-word"
              onClick={buttonAction}
            >
              {buttonTitle}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </>
  )
}
