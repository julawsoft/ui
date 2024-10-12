import { Box, Flex } from '@chakra-ui/react'
import { MembersOfOffice } from '../MembersOfOffice'
import { CurrentOffice } from '../CurrentOffice'

export function Office() {
  return (
    <Flex
      width="100%"
      height="100%"
      borderRadius={10}
      overflow="hidden"
      border="1px solid #E5DACF"
    >
      <Box width={21} alignSelf="stretch" background="#C2912E" />
      <Box
        flex="1 1 0"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="inline-flex"
      >
        <CurrentOffice
          hasAdminPermissionRole={true}
          name={'Talatona'}
          category={'Head Quarter'}
        />
        <Box alignSelf="stretch" height={0} border="0.70px solid #D9D9D9" />
        <MembersOfOffice />
      </Box>
    </Flex>
  )
}
