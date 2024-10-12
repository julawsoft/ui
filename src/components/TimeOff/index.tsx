import { Box, Flex, Text } from '@chakra-ui/react'
import { TEXT_FOR_HOME_PAGE } from '../../pages/Home/utils'

export interface TimeOffProps {
  approved: number
  pending: number
  remaining: number
  startDate: string
  handleClick?: () => void
}

export function TimeOff({
  approved = 0,
  pending = 0,
  remaining = 0,
  startDate = '1 Jan 2024',
  handleClick,
}: TimeOffProps) {
  return (
    <Flex
      border={'1px solid #C2912E'}
      p={4}
      gap={5}
      flexDirection={'column'}
      minWidth={'200px'}
      borderRadius={8}
    >
      <Flex flexDirection={'column'}>
        <Text fontSize={'16px'} fontWeight={'medium'}>
        { TEXT_FOR_HOME_PAGE.TIME_OFF }
        </Text>
        <Text fontSize={'12px'}>{startDate ?? ''}</Text>
      </Flex>
      <Box h="4px" w="100%" bg={'yellow.400'} />
      <Flex gap={5} justifyContent={'space-between'} alignItems={'center'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'24px'} fontWeight={'medium'}>
            {approved}
          </Text>
          <Flex justifyContent={'center'} alignItems={'center'} gap={1}>
            <Box bgColor={'green.500'} width={'12px'} height={'12px'}></Box>
            <Text>Aprovado</Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'24px'} fontWeight={'medium'}>
            {pending}
          </Text>
          <Flex justifyContent={'center'} alignItems={'center'} gap={1}>
            <Box bgColor={'orange.500'} width={'12px'} height={'12px'}></Box>{' '}
            <Text>Pendente</Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Text fontSize={'24px'} fontWeight={'medium'}>
            {remaining}
          </Text>
          <Flex justifyContent={'center'} alignItems={'center'} gap={1}>
            <Box bgColor={'gray.500'} width={'12px'} height={'12px'}></Box>{' '}
            <Text>Restantes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
