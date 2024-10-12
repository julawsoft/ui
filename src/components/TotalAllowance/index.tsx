import { Box, Flex, Text } from '@chakra-ui/react'
import { TEXT_FOR_HOME_PAGE } from '../../pages/Home/utils'

export interface EmptyEventProps {
  title: string
  total: number
  bgColor?: string
}

export function TotalAllowance({ title, total, bgColor }: EmptyEventProps) {
  return (
    <Flex
      minW={'350px'}
      width={'100%'}
      h={'110px'}
      bg={bgColor ?? 'f2f2f2'}
      flexDirection={'column'}
      p={4}
      borderRadius={8}
    >
      <Flex width={'100%'} fontSize={14} fontWeight={'semibold'} gap={4}>
        {title}
      </Flex>
      <Flex alignItems={'center'} gap={1}>
        <Text
          fontSize={18}
          fontWeight={'semibold'}
          color={'#c2912e'}
        >{`${total}`}</Text>
        <Text>dias</Text>
      </Flex>
      <Box>
        <Text fontSize={10}>{TEXT_FOR_HOME_PAGE.TOTAL_ALLOWANCE_NOTE}</Text>
      </Box>
    </Flex>
  )
}
