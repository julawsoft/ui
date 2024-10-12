import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Buildings, FileArrowDown } from 'phosphor-react'
import Badge from '../../../components/Badge'
import ContratoForm from './form'
import { Brand } from '../../../components/Brand'
import ErrorFail from '../../../components/ErrorFail'
import useAsyncState from '../../../hooks/use-async-state'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { EmployDTO } from '../../../services/Employee/get-employee-by-id.service'
import { Employee } from '../../../constants/entities/employee'
const url = import.meta.env.VITE_BASE_URI

const Contratos = ({ employee }: { employee: EmployDTO }) => {
  const { loading, error } = useAsyncState()

  if (error)
    return (
      <ErrorFail
        title="Ops! Algo deu errado..."
        message="Lamentamos, ocorreu alguma situa ção inesperada ao carregar a informção"
      ></ErrorFail>
    )

  return (
    <>
      {loading ? (
        <SpinnerProgress></SpinnerProgress>
      ) : (
        <Flex style={{ padding: '32px' }}>
          <Box flex={2}>
            <Brand
              title="Informação básica"
              description="Informações básicas sobre a tua função"
              position="left"
              icon={<Buildings size={28} color="#C2912E" />}
            ></Brand>
            <Flex gap={2}>
              <Badge color="green">Activo</Badge>
              {employee[Employee.contract] && (
                <a
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  href={url + 'open_file/' + employee[Employee.contract]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileArrowDown size={32} />
                  Descarregar
                </a>
              )}
            </Flex>
          </Box>
          <Box flex={1} display="block" flexDirection="column">
            {employee && <ContratoForm employee={employee}></ContratoForm>}
          </Box>
        </Flex>
      )}
    </>
  )
}

export default Contratos
