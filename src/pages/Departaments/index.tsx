import { useEffect } from 'react'
import useAsyncState from '../../hooks/use-async-state'
import { CaretDown } from 'phosphor-react'
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { ErrorLocal } from '../../components/ErrorLocal'
import { LoaderLocal } from '../../components/LoaderLocal'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'
import { IEmployee } from '../../schema/Employee'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'
import { Table } from '../../components/Table'
import { columns, dataTransform } from './transform'
import PermissionGate from '../../hooks/permissionGate'
import { Roles } from '../../routes/roles'
import { toast } from 'react-toastify'

export function Departaments() {
  const navigate = useNavigate()
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<IEmployee[]>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        setMessage('')
        setData([])
        setError(false)
        setLoading(false)
      } catch (error) {
        toast.error(String(error))
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => {
    init()
  }

  const handleAddEmployee = () => {}

  const handleImportCSV = () => {
    navigate(ROUTES.ImportCSV, { state: { back: ROUTES.Pessoas } })
  }

  const handleClickEmployee = (employeeId: number) => {
    navigate(ROUTES.Profile, {
      state: { id: employeeId, back: ROUTES.EquipaRH },
    })
  }

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <HeaderWithNav title={'Colaboradores'} />
      <Flex width={'100%'} gap={2}>
        {error === true && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <Box width={'100%'} my={4}>
            <Flex flexDirection={'column'} width={'100%'} gap={4}>
              <Flex gap={8} width={'100%'} justifyContent={'end'}>
                <Box>
                  <PermissionGate roles={[Roles.PEOPLE.can_create_employee]}>
                    <Menu>
                      <MenuButton
                        bgColor={'#C2912E'}
                        _expanded={{ bg: '#1d212a' }}
                        color={'#ffffff'}
                        _hover={{
                          bg: '#1d212a',
                        }}
                        as={Button}
                        rightIcon={<CaretDown />}
                      >
                        Adiconar
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={handleImportCSV}>
                          Importar de CSV
                        </MenuItem>
                        <MenuItem onClick={handleAddEmployee}>
                          Cadastrar Novo
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </PermissionGate>
                </Box>
              </Flex>
              <Box>
                <Table
                  isLoading={loading}
                  columns={columns}
                  dataSource={dataTransform(data ?? [], handleClickEmployee)}
                  placeholder="Pesquise um colaborador"
                  searchKey="colaborador"
                  title="Nenhum colobarador encontrado..."
                />
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}
