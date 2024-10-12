import { Flex, Text } from '@chakra-ui/react'
import { File } from 'phosphor-react'

interface NoDocumentProps {
  message: string
}
const NoDocument = (props: NoDocumentProps) => {
  const { message } = props
  return (
    <Flex
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: '96px' }}
    >
      <File size={94} color="#D9D9D9" style={{ marginBottom: '24px' }} />
      <Text color="#CCCCCC">{message}</Text>
    </Flex>
  )
}

export default NoDocument
