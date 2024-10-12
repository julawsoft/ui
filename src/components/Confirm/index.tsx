import { Button, Flex, Text } from '@chakra-ui/react'
import { Check, X } from 'phosphor-react'

interface PropsToast {
  title: string
  isLoading: boolean
  onAccept: () => void
  onReject: () => void
}

export function Confirm({ title, isLoading, onAccept, onReject }: PropsToast) {
  return (
    <Flex flexDirection={'column'}>
      <Text fontSize={18}>{title}</Text>
      <Flex
        justifyContent={'space-between'}
        mt={4}
        borderTop="1px solid #c3c3c3"
        pt={2}
      >
        <Button onClick={onReject} colorScheme="red" gap={1}>
          <X size={16} weight="fill" />
          Não
        </Button>
        <Button
          onClick={onAccept}
          colorScheme="green"
          gap={1}
          isLoading={isLoading}
          loadingText="Enviando..."
        >
          <Check size={16} />
          Sim
        </Button>
      </Flex>
    </Flex>
  )
}
