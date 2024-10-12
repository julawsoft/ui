import { useEffect, useState } from 'react'
import { CaretDown, MagnifyingGlass } from 'phosphor-react'
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { ErrorLocal } from '../../components/ErrorLocal'
import { LoaderLocal } from '../../components/LoaderLocal'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'
import { columns, dataTransform } from './transform'
import PermissionGate from '../../hooks/permissionGate'
import { Roles } from '../../routes/roles'
import { Modal } from '../../components/Forms/Modal'
import CreateEmployee from './create'
import useEmployee from './use-employee'
import { toast } from 'react-toastify'
import { TableWithOutFilter } from '../../components/TableWithOutFilter'
import { getFilterServiceEmployees } from '../../services/Employee/get-employees-filter.service'
import { getEmployees } from '../../services/Employee/get-employees.service'
import { IEmployee } from '../../schema/Employee'
import { chageStatusEmployee } from '../../services/Employee/get-employees-change-status.service'
import { Select } from '../../components/Forms/Select'
import { convertDataToSelect } from '../../utils/convertDataToSelect'
import { IDepartment } from '../../schema/Department'
import { DepartmentService } from '../../services/Organograma/DepartmentService'
import { ICategory } from '../../schema/Category'
import { CategoryService } from '../../services/Organograma/CategoryService'

export interface IPessoaFilter {
  departmants: string | undefined
  categories: string | undefined
  status: string | undefined
  employee: string | undefined
}

export function Pessoas() {
  const navigate = useNavigate()

  const {
    loading,
    onOpen,
    isOpen,
    onClose,
    handleClose,
    error,
    message,
    loadingFilter,
    setLoadingFilter,
    setLoading,
    setError,
    setMessage,
  } = useEmployee()

  const [emailInvite, setEmailInvite] = useState<string>('')

  const [locknputModal, setlocknputModal] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)

  const [employeeTransformed, setEmployeeTransformed] = useState<any>([])
  const [filter, setFilter] = useState<string>('')

  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(true)
  const [isChangeStatusId, setIsChangeStatusId] = useState<number>(0)

  const [categories, setCategories] = useState<ICategory[]>([])
  const [departmants, setDepartaments] = useState<IDepartment[]>([])

  const [filters, setFilters] = useState<
    IPessoaFilter>({
      departmants: undefined,
      categories: undefined,
      status: undefined,
      employee: undefined,
    })

  const init = async () => {
    if (error && !loading) {
      toast.error(String(message))
    }
    await getAllEmployees(filters)

    const response = await CategoryService.getAll()
    setCategories(response as ICategory[])
    const departament = await DepartmentService.getAll()
    setDepartaments(departament)

  }

  useEffect(() => {
    init()
    if (reload) handleReload()
  }, [reload])

  const handleReload = () => {
    init()
    setReload(false)
  }

  function handleFilterEmployee(filterInput: string) {

    console.log('handleFilterEmployee', filterInput)

    setFilter(filterInput)
    if (filter.length === 0) {
      return getAllEmployees({...filters})
    }
    setFilters({...filters, employee: filterInput})
    console.log("filterInput",  filterInput)
    return getAllEmployees({...filters, employee: filterInput})
    // return getFilterEmployees(filters)
  }

  async function getFilterEmployees(filter: string) {
    setLoadingFilter(true)
    setTimeout(async () => {
      try {
        const response = await getFilterServiceEmployees(filter)
        setEmployeeTransformedFunciton(response)
        setLoadingFilter(false)
      } catch (error) {
        setLoadingFilter(false)
        setError(true)
        setMessage(String(error))
      } finally {
        setLoadingFilter(false)
      }
    }, 1000)
  }

  async function getAllEmployees(filters) {
    
    console.log("here ", filters)
    
    setLoadingFilter(true)
    setTimeout(async () => {
      try {
        const response = await getEmployees(filters)
        setEmployeeTransformedFunciton(response)
        setLoading(false)
        setLoadingFilter(false)
      } catch (error) {
        setLoading(false)
        setLoadingFilter(false)
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
        setLoadingFilter(false)
      }
    }, 1000)
  }

  const handleAddEmployee = () => {
    setlocknputModal(false)
    onOpen()
  }

  const handleImportCSV = () => {
    navigate(ROUTES.ImportCSV, { state: { back: ROUTES.Pessoas } })
  }

  const handleClickEmployee = (employeeId: number) => {
    navigate(ROUTES.Profile, {
      state: { id: employeeId, back: ROUTES.EquipaRH },
    })
  }

  const handleChangeStatusColaborador = (employee: IEmployee, statusChange) => {

    setIsChangeStatusId(Number(employee.id))
    setIsChangeStatus(true)

    setTimeout(async () => {
      try {

        const status = statusChange === 1 ? 'ACTIVE' : 'INACTIVE';
        const response = await chageStatusEmployee(Number(employee.id), status)
        if (response) {
          if (response.response.statusCode === 200) {
            toast.success('Status alterado com Sucesso!')
            setReload(true)
          } else {
            toast.error('Erro ao alterar o status.')
          }
        }
      } catch (error) {
        toast.error(String(error))
      } finally {
        setIsChangeStatusId(0)
        setIsChangeStatus(false)
      }
    }, 1000)
  }

  const handleSendInvite = (email: string) => {
    setEmailInvite(email)
    setlocknputModal(true)
    onOpen()
  }

  const setEmployeeTransformedFunciton = (data: any) => {
    const dataReturned = dataTransform(
      data,
      handleClickEmployee,
      handleSendInvite,
      handleChangeStatusColaborador,
      isChangeStatus,
      isChangeStatusId
    )
    setEmployeeTransformed([...dataReturned])
  }

  const handleChangeSelectDepartament = async (value) => {
    console.log('chanhe departamento', value)
    setFilters({ ...filters, departmants: value })
    await getAllEmployees({ ...filters, departmants: value })
    //setReload(true)
  }
  const handleChangeStatus = async (value) => {
    console.log('chanhe status', value)
    setFilters({ ...filters, status: value })
    await getAllEmployees({ ...filters, status: value })
  }
  const handleChangeCategories = async (value) => {
    console.log('chanhe categorias', value)
    setFilters({ ...filters, categories: value })
    await getAllEmployees({ ...filters, categories: value })
  }

  const resetFilters = () => {
    setFilters({
      departmants: undefined,
      categories: undefined,
      status: undefined,
      employee: undefined,
    })
    setReload(true)
  }


  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <HeaderWithNav title={'Lista dos Colaboradores'} />
      <Flex width={'100%'} gap={2}>
        {error === true && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <Box width={'100%'} my={2}>
            <Flex flexDirection={'column'} width={'100%'} gap={4}>
              <Flex gap={8} width={'100%'} justifyContent={'space-between'} bgColor={'#F4F4F5'} p={2} alignItems={'center'}>
                <Box>
                  <PermissionGate roles={[Roles.PEOPLE.can_create_employee]}>
                    <Flex alignItems={'center'} gap={2}>
                      <Flex alignItems={'center'} gap={1}>
                        <Select
                          data={convertDataToSelect(departmants, 'description')}
                          size="sm"
                          onChange={(e: any) =>
                            handleChangeSelectDepartament(e.target.value)
                          }
                          placeholder='Seleccione um departamento'
                          defaultValue={filters.departmants}

                        />
                      </Flex>
                      <Flex alignItems={'center'} gap={1}>
                        <Select
                          data={convertDataToSelect(categories, 'description')}
                          size="sm"
                          onChange={(e: any) => handleChangeCategories(e.target.value)}
                          placeholder='Seleccione uma categoria'
                          defaultValue={filters.categories}

                        />
                      </Flex>
                      <Flex alignItems={'center'} gap={1}>
                        <Select
                          data={convertDataToSelect([
                            { id: 'ACTIVE', "description": 'Activo' },
                            { id: 'INACTIVE', "description": 'Inactivo' },
                          ], 'description')}
                          size="sm"
                          onChange={(e: any) => handleChangeStatus(e.target.value)}
                          placeholder='Seleccione um status'
                          defaultValue={filters.status}
                        />
                      </Flex>
                    </Flex>
                  </PermissionGate>
                </Box>
                <Box width={'50%'}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      alignItems={'center'}
                      justifyContent={'center'}
                      height={'100%'}
                      color={'gray.300'}
                    >
                      <MagnifyingGlass size={22} />
                    </InputLeftElement>
                    <Input
                      focusBorderColor="yellow.400"
                      size={'sm'}
                      type="search"
                      onChange={(e: any) => handleFilterEmployee(e.target.value)}
                      placeholder={'Pesquise por um Colaborador'}
                    />
                  </InputGroup>
                </Box>
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
                        size={'sm'}
                      >
                        Adicionar
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
                <TableWithOutFilter
                  isLoading={loading || loadingFilter}
                  columns={columns}
                  dataSource={employeeTransformed}
                  placeholder="Pesquise um colaborador"
                  searchKey="colaborador"
                  title="Nenhum colobarador encontrado..."
                />
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Novo colaborador"
        description="Crie um novo colaborador"
        size={'3xl'}
      >
        <CreateEmployee
          onSave={async () => {
            onClose()
            await getAllEmployees(filters)
          }}
          email={emailInvite}
          locknputModal={locknputModal}
        ></CreateEmployee>
      </Modal>
    </Flex>
  )
}
