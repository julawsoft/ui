import { Box, Flex } from '@chakra-ui/react'
import { Key } from 'phosphor-react'
import { Brand } from '../../../components/Brand'
import CredentialForm from './form'

const Credentials = ({ employee }: { employee: any }) => {
  return (
    <>
      {
        <Flex style={{ padding: '32px' }}>
          <Box flex={2}>
            <Brand
              title="Credencial"
              description="Precisas actualizar a tua credencial de acesso?"
              position="left"
              icon={<Key size={28} color="#C2912E" />}
            ></Brand>
          </Box>
          <Box flex={1} display="block" flexDirection="column" boxShadow={'md'}>
            {employee && <CredentialForm employee={employee}></CredentialForm>}
          </Box>
        </Flex>
      }
    </>
  )
}

export default Credentials
