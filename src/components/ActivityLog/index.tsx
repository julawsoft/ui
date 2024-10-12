import { Text, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface ActivityLogProps {
  icon: ReactNode
  description: string
  handle?: () => void
}

export function ActivityLog({ icon, description, handle }: ActivityLogProps) {
  return (
    <Flex
      width={'100%'}
      h={'3rem'}
      borderRadius={8}
      gap={1}
      bg={'#FFF'}
      p={2}
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        width={'32px'}
        height={'32px'}
        bgColor={'#25282A'}
        color={'white'}
        borderRadius={'50%'}
      >
        {icon}
      </Flex>
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        p={2}
      >
        <Text
          cursor={'pointer'}
          textDecoration={'underline'}
          onClick={handle}
          _hover={{
            color: 'teal.700',
          }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
