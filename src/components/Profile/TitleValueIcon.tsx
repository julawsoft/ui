import { Avatar, Flex } from '@chakra-ui/react'
import { TitleValue } from './TitleValue'

export function TitleValueIcon({
  key,
  value,
  size,
  src,
  link,
  params,
  onClick,
}) {
  return (
    <Flex gap={2} alignItems={'center'} key={key}>
      <Avatar src={src} size={size}></Avatar>
      <TitleValue value={value} link={link} params={params} onClick={onClick} />
    </Flex>
  )
}
