import { useEffect } from 'react'
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import useAsyncState from '../../hooks/use-async-state'
import getEmployeeUserById from '../../services/Employee/get-employee-by-user-id.service'
import { Loader } from '../../components/Loader'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { EmptyEvent } from '../../components/EmptyEvent'
import { User } from 'phosphor-react'
import Employeement from './Employeement'
import { EmployeeManager } from '../../schema/Employee'
import Credentials from './Credentials'
import useColabContext from '../../context_api'
import PersonalData from './PersonalData'
import CardHeaderUser from '../../components/CardHeaderUser'
import { EmployeeDocument } from './Documents'
import { Roles } from '../../routes/roles'

const ProfileGeneral = () => {
  const { state } = useLocation()

  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<EmployeeManager>()

  useEffect(() => {
    init()
  }, [])

  const { colabProvider } = useColabContext()

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await getEmployeeUserById(state.id)
        setData(response)
      } catch (error) {
        setError(true)
        setMessage(String(error))
        toast.error(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <>
      {data && (

        <CardHeaderUser name={data.name} photo={data.photo} role={data.Contract && data.Contract[0].Role
          ? data.Contract[0].Role.description
          : 'N/A'} status={'ACTIVO'} />)}

      {loading && !error ? (
        <Loader />
      ) : (
        <>
          <Tabs colorScheme="yellow">
            <TabList
              display="flex"
              justifyContent="center"
              bg="gray.900"
              color="gray.100"
              py={2}
            >
              <Tab>Missão</Tab>
              <Tab>Dados Pessoais</Tab>
              {colabProvider.user.id === data?.id || colabProvider.auth.roles.includes(Roles.PROFILE.can_see_documents_of_employee) ?  (
                <>
                  {' '}
                  <Tab>Documentos</Tab>
                </>
              ) : null}
              {colabProvider.user.id === data?.id ? (
                <>
                  {' '}
                  <Tab>Definições</Tab>
                </>
              ) : null}
            </TabList>

            {data ? (
              <TabPanels width="100%">
                <TabPanel m={0} p={0}>
                  <Box mt={5}>
                    <Employeement employee={data} />
                  </Box>
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <Box mt={5}>
                    <PersonalData employee={data} />
                  </Box>
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <Box mt={5}>
                    <EmployeeDocument employee={data} />
                  </Box>
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <Box mt={5}>
                    <Credentials employee={data} />
                  </Box>
                </TabPanel>
              </TabPanels>
            ) : (
              <TabPanels>
                <TabPanel>
                  <>
                    <EmptyEvent
                      icon={<User size={22} />}
                      title={message}
                      bgColor={'#f2f2f2'}
                    />
                  </>
                </TabPanel>
              </TabPanels>
            )}
          </Tabs>
        </>
      )}
      {/* 
      <Navbar links={profileLinks}></Navbar>

      <Box
        style={{
          margin: '0 auto',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {loading ? <SpinnerProgress></SpinnerProgress> : <Outlet></Outlet>}
      </Box> */}
    </>
  )
}

export default ProfileGeneral
