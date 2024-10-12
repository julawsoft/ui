import { Avatar, Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface CardEventProps {
  icon: ReactNode
  userName: string
  date: string
  days?: string
  bgColor?: string
  isIcon?: boolean
  bgColorIcon?: string
}

export function CardEvent({
  icon,
  userName,
  date,
  days,
  bgColor,
  isIcon = false,
  bgColorIcon,
}: CardEventProps) {
  return (
    <Flex
      borderRadius={8}
      gap={1}
      bgColor={bgColor ?? '#ffffff'}
      flex={1}
      maxWidth={'380px'}
      minWidth={'380px'}
    >
      <Flex
        justifyContent={'center'}
        bgColor={bgColorIcon ??'#26282a'}
        alignItems={'center'}
        minW={'80px'}
      >
        { isIcon ? (icon) :(<Avatar
          name={userName}
          src=""
          size={'md'}
          border={'1px solid #d69e2e'}
        />)}
      
      </Flex>
      <Flex flexDirection={'column'} p={2} width={'100%'}>
        <Box fontSize={'18px'} fontWeight={'medium'}>
          {userName}
        </Box>
        <Box fontSize={'14px'}>{date}</Box>
        <Box>{days}</Box>
      </Flex>
    </Flex>
  )
}
