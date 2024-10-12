import { Flex, Spinner, Text } from '@chakra-ui/react'

interface PropsEmpty {
  title?: string
  isShowText?: boolean
}

export default function SpinnerProgress({
  title,
  isShowText = true,
}: PropsEmpty) {
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={4}
    >
      <Spinner color="#C2912E" />
      <Text fontWeight={500}>
        {(title || isShowText) ?? 'Carregando os dados...'}
      </Text>
    </Flex>
  )
}
