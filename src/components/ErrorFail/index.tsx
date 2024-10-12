import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { WarningCircle } from 'phosphor-react'
import { FC } from 'react'
import { Brand } from '../Brand'
import { ErrorFailProps } from './error-fail.types'

const ErrorFail: FC<ErrorFailProps> = ({ title, message }) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 1 }} gap={4}>
      <Box
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '150px',
        }}
      >
        <Brand
          title={title}
          position="center"
          description={message}
          icon={<Text />}
        ></Brand>
      </Box>
      <Box
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '180px',
        }}
      >
        <WarningCircle size={150} color="#AA283488" />
      </Box>
    </SimpleGrid>
  )
}

export default ErrorFail
