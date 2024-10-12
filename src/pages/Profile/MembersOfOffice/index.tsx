import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'

export function MembersOfOffice() {
  return (
    <>
      <Flex
        width="100%"
        alignSelf="stretch"
        background="white"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="inline-flex"
        paddingTop={2}
        paddingBottom={2}
      >
        <VStack
          paddingLeft={5}
          paddingRight={5}
          background="white"
          justifyContent="center"
          alignItems="flex-start"
          gap={2}
        >
          <Text
            color="#4D4B4B"
            fontSize="xl"
            fontFamily="Roboto"
            fontWeight="700"
          >
            Membros
          </Text>
          <AvatarGroup size="md" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </VStack>
        <Spacer />
        <Flex
          width={128}
          alignSelf="stretch"
          paddingLeft={5}
          paddingRight={5}
          background="white"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            width={88}
            height={35}
            paddingLeft={16}
            paddingRight={16}
            paddingTop={8}
            paddingBottom={8}
            borderRadius={6}
            overflow="hidden"
            border="1px solid #C2912E"
            justifyContent="center"
            alignItems="center"
            gap={10}
            display="flex"
            color="#C2912E"
            fontSize={15}
            fontFamily="Roboto"
            fontWeight="700"
            lineHeight="24"
          >
            Visitar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
