import { Button, Flex, Spacer, Text, Stack } from '@chakra-ui/react'

export interface CurrentOfficeProps {
  hasAdminPermissionRole: boolean
  name: string
  category: string
}

export function CurrentOffice({
  hasAdminPermissionRole,
  name,
  category,
}: CurrentOfficeProps) {
  return (
    <Flex
      alignSelf="stretch"
      background="white"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Stack background="white" justifyContent="center" p={5}>
        <Text
          alignSelf="stretch"
          color="#4D4B4B"
          fontSize={24}
          fontFamily="Roboto"
          fontWeight="700"
        >
          {name}
        </Text>
        <Text
          alignSelf="stretch"
          color="#444444"
          fontSize={16}
          fontFamily="Roboto"
          fontWeight="700"
          textTransform="uppercase"
        >
          {category}
        </Text>
      </Stack>
      <Spacer />
      {hasAdminPermissionRole && (
        <Flex
          alignSelf="stretch"
          p={5}
          background="white"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            w={173}
            h={35}
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
            bg={'white'}
            fontSize={15}
            fontFamily="Roboto"
            fontWeight="700"
            lineHeight="24"
          >
            Mudar de Escritório
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
