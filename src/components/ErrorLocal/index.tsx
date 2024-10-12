import { Flex } from '@chakra-ui/react'
import { ArrowsCounterClockwise, Warning } from 'phosphor-react'

interface ErrorLocalProps {
  message: string
  reload: () => void
}

export function ErrorLocal({ message, reload }: ErrorLocalProps) {
  return (
    <Flex
      gap={4}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      border={'.5px solid #F75A68'}
      p={'2'}
    >
      <Warning size={24} color="#F75A68" /> {message}{' '}
      <ArrowsCounterClockwise
        size={24}
        color="green"
        cursor={'pointer'}
        onClick={reload}
      />
    </Flex>
  )
}
