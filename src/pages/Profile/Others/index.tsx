import { Box, Flex } from '@chakra-ui/react'
import { Buildings } from 'phosphor-react'
import { Brand } from '../../../components/Brand'
import { EmployDTO } from '../../../services/Employee/get-employee-by-id.service'
import OthersForm from './form'

const Others = ({ employee }: { employee: EmployDTO }) => {
  return (
    <>
      {
        <Flex style={{ padding: '32px' }}>
          <Box flex={2}>
            <Brand
              title="Outros"
              description="Informações adicionais sobre o colaborador"
              position="left"
              icon={<Buildings size={28} color="#C2912E" />}
            ></Brand>
          </Box>
          <Box flex={1} display="block" flexDirection="column">
            {employee && <OthersForm employee={employee}></OthersForm>}
          </Box>
        </Flex>
      }
    </>
  )
}

export default Others
