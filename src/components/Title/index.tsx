import { Flex, Text } from '@chakra-ui/react'

interface TitleProps {
  title: string
  linkToBack?: string
}

export function Title({ title }: TitleProps) {
  return (
    <Flex py={4} borderBottom={'1px solid #f2f2f2'}>
      <Text
        fontSize={'1.2em'}
        fontWeight={'medium'}
        textTransform={'uppercase'}
      >
        {title}
      </Text>
    </Flex>
  )
}
