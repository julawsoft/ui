import { Avatar, Flex, Text } from '@chakra-ui/react'
import { TitleValue } from './TitleValue'

export function TitleValueIconFunction({
  key,
  value,
  size,
  src,
  link,
  params,
  onClick,
  role,
}) {
  return (
    <Flex gap={2} alignItems={'center'} key={key}>
      <Flex>
        <Avatar src={src} size={size}></Avatar>
      </Flex>
      <Flex flexDirection={'column'}>
        <TitleValue
          value={value}
          link={link}
          params={params}
          onClick={onClick}
        />
        <Text fontSize={'13px'}>{role}</Text>
      </Flex>
    </Flex>
  )
}
