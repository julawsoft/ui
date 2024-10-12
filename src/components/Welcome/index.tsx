import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { getFirstAndLastName } from '../../utils/userName'

export interface WelcomeProps {
  iconUser: string
  userName: string
  date: string | ReactNode
  bgColor?: string
}

export function Welcome({ iconUser, userName, date, bgColor }: WelcomeProps) {
  return (
    <Flex maxW={'350px'} borderRadius={8}>
      <Flex gap={2}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'52px'}
          height={'52px'}
          bg={bgColor ?? 'gray.200'}
          color={'white'}
          borderRadius={8}
        >
          <Avatar name={userName} size={'full'} src={iconUser}></Avatar>
        </Box>
        <Flex flexDirection={'column'} p={2} justifyContent={'center'}>
          <Text fontSize={'1em'} fontWeight="normal">
            <Flex gap={1} fontSize={'1em'}>
              Olá, <Text fontWeight={'medium'}>{getFirstAndLastName(userName)}</Text>
            </Flex>
          </Text>
          <Text fontSize="0.8em" color={'gray.400'}>
            {date}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
