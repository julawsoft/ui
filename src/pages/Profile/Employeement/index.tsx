import { ChangeEvent, FC, useState } from 'react'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { EmployeeManager, IEmployee } from '../../../schema/Employee'
import { Title, TitleBox, TitleValue, TitleValueIcon } from '../../EquipaRH'
import { useNavigate } from 'react-router-dom'
import { CardLargeProfile } from '../../../components/Profile/CardLargeProfile'
import { Modal } from '../../../components/Forms/Modal'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { Select } from '../../../components/Forms/Select'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'
import { toast } from 'react-toastify'
import { updateLineManager } from '../../../services/Employee/updateLineManager'
import { getEmployees } from '../../../services/Employee/get-employees.service'
import PermissionGate from '../../../hooks/permissionGate'
import { Roles } from '../../../routes/roles'
import { LANGUAGES } from '../../../utils/language'
import { Pencil } from 'phosphor-react'
import { removeEmployeeIntList } from './transform'
import { ROUTES } from '../../../routes/constants'
import useColabContext from '../../../context_api'
import { GroupsPermissions } from '../../../utils/groups'
import { DisplayDateString } from '../../../utils/convertDatas'

interface EmployeementProps {
  employee: EmployeeManager
}

const Employeement: FC<EmployeementProps> = ({ employee }) => {
  const navigate = useNavigate()

  const handleLink = (url: string, params) => {
    navigate(url, { state: { ...params } })
  }

  const { colabProvider } = useColabContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
  const [data, setData] = useState<IEmployee[]>([])
  const [idSHSelected, setIdSHSelected] = useState<number>(0)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const getListEmployees = () => {
    setIsLoadingModal(true)
    setTimeout(async () => {
      try {
        const response = await getEmployees({
          departmants: undefined,
          categories: undefined,
          status: undefined,
          employee: undefined,
        })
        setData(removeEmployeeIntList([], response))
        setIsLoadingModal(false)
      } catch (error) {
        setMessage(String(error))
        setIsError(true)
        toast.error(String(error))
      } finally {
        setIsLoadingModal(false)
      }
    }, 1000)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value
    setIdSHSelected(Number(value))
  }

  const handleSaveChefiaDirecto = () => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await updateLineManager(
          Number(idSHSelected),
          Number(employee.id),
          null,
        )

        if(response){
          if (response.response.statusCode === 200) {
            setIsLoadingModal(false)
            toast.success('Liderança directa, definido com Sucesso!')
            setIsOpen(false)
          } else {
            toast.error(response.response.message)
          }
        }
      } catch (error) {
        toast.error(String(error))
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => {
    getListEmployees()
  }

  const buttonAction = () => {
    getListEmployees()
    setIsOpen(true)
  }

  const canSee =
    colabProvider.user.id === employee.id ||
    colabProvider.auth.profile === GroupsPermissions.ADMIN ||
    colabProvider.auth.profile === GroupsPermissions.RH_LEADER ||
    colabProvider.auth.profile === GroupsPermissions.RH ||
    colabProvider.auth.profile === GroupsPermissions.RH_AUX ||
    colabProvider.user.id === employee.LineManager.id

  return (
    <>
      <Grid templateColumns="2fr 1fr" gap={8} width={'100%'}>
        <Flex flexDirection={'column'} gap={8}>
          <CardLargeProfile
            name={employee.name}
            image={employee.photo}
            role={
              employee.Contract && employee.Contract[0].Role
                ? employee.Contract[0].Role.description
                : 'N/A'
            }
            email={employee.Contact.email ?? '- -'}
            phone={String(employee.Contact.phone) ?? '- - '}
            dateStart={
              employee.Contract
                ?  DisplayDateString(employee.Contract[0].joing_date)
                : 'N/A'
            }
          />
          <Flex gap={8} flexDirection={'column'}>
            {canSee ? (
              <>
                <Box>
                  <Flex flexDirection={'column'} gap={2}>
                    <Text
                      fontSize={'1rem'}
                      fontWeight={'semibold'}
                      color={'colab.sidebar'}
                    >
                      Objectivos
                    </Text>
                    <Box>
                      <Text fontSize={'14px'} fontWeight={'light'}>
                        {'N/A'}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex flexDirection={'column'} gap={2}>
                    <Text
                      fontSize={'1rem'}
                      fontWeight={'semibold'}
                      color={'colab.sidebar'}
                    >
                      Biométrico
                    </Text>
                    <Box>
                      <Text fontSize={'14px'} fontWeight={'light'}>
                        {'N/A'}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </>
            ) : (
              <Text>Nenhum objectivo do Departamento</Text>
            )}
          </Flex>
        </Flex>
        <Flex flexDirection={'column'}>
          <TitleBox mb={6}>
            <Title title={'Departamentos'} />
            <TitleValue
              value={
                employee.Organogram
                  ? employee.Organogram.description
                  : 'Nenhum Departamento'
              }
              link={''}
              params={''}
              onClick={handleLink}
            />
          </TitleBox>
          <TitleBox mb={6}>
            <PermissionGate roles={[Roles.PROFILE.can_change_line_manager]}>
              <Flex
                cursor={'pointer'}
                _hover={{
                  color: '#fbfaf8',
                }}
                onClick={buttonAction}
                title={LANGUAGES.ALTERAR_O_CHEFIA_DIRECTO}
                bgColor={'#d79e2e'}
                marginLeft={'150px'}
                width={'30px'}
                height={'30px'}
                borderRadius={'50%'}
                justifyContent={'center'}
                alignItems={'center'}
                position={'absolute'}
              >
                <Pencil size={18} cursor={'pointer'} />
              </Flex>
            </PermissionGate>
            <Title title={'Liderança Directa'} />
            {employee.LineManager && employee.LineManager.name ? (
              <TitleValueIcon
                key={1}
                size={'xs'}
                src={''}
                value={employee.LineManager.name}
                link={''}
                params={''}
                onClick={handleLink}
              />
            ) : (
              'N/A'
            )}
          </TitleBox>
          <TitleBox mb={6}>
            <Title title={'Equipa'} />
            {employee.DirectReport
              ? employee.DirectReport.map((item, index) => (
                  <TitleValueIcon
                    key={index}
                    size={'xs'}
                    src={''}
                    value={item.Employee.name}
                    link={''}
                    params={''}
                    onClick={() =>
                      handleLink(ROUTES.Profile, { id: item.Employee.id })
                    }
                  />
                ))
              : 'N/A'}
          </TitleBox>
          <TitleBox mb={6}>
            <Title title={'Colaboradores na mesma Direcção'} />
            {employee.OrganogramPeers.length && employee.OrganogramPeers
              ? employee.OrganogramPeers.map((item, index) => (
                  <TitleValueIcon
                    key={index}
                    size={'xs'}
                    src={''}
                    value={item.name}
                    link={''}
                    params={''}
                    onClick={() => handleLink(ROUTES.Profile, { id: item.id })}
                  />
                ))
              : 'Nenhuma equipa à Liderar'}
          </TitleBox>
          {/* <TitleBox mb={6}>
                <Title title={"Próximos a si"} />
                <TitleValueIcon
                  key={4}
                  size={"xs"}
                  src={""}
                  value={"Recursos Humanos"}
                  link={""}
                  params={""}
                  onClick={handleLink}
                />
                <TitleValueIcon
                  key={5}
                  size={"xs"}
                  src={""}
                  value={"Recursos Humanos"}
                  link={""}
                  params={""}
                  onClick={handleLink}
                />
              </TitleBox> */}
        </Flex>
      </Grid>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Lista dos Líderes da Empresa"
        description="Define o Líder directo do Colaborador"
        size={'lg'}
      >
        {isLoadingModal && !isError ? (
          <SpinnerProgress title="Carregando... Aguarde" />
        ) : (
          <>
            {isError ? (
              <ErrorLocal message={message} reload={handleReload} />
            ) : (
              <>
                <Flex gap={4} flexDirection={'column'}>
                  <Select
                    label="Líderança directa"
                    data={convertDataToSelect(data, 'name')}
                    onChange={handleSelectChange}
                  />
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Enviando..."
                    onClick={handleSaveChefiaDirecto}
                  >
                    Definir
                  </Button>
                </Flex>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default Employeement
