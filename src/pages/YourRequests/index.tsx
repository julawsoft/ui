import { useEffect } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import useAsyncState from '../../hooks/use-async-state'
import getEmployeeUserById from '../../services/Employee/get-employee-by-user-id.service'
import { Loader } from '../../components/Loader'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { EmptyEvent } from '../../components/EmptyEvent'
import { User } from 'phosphor-react'
import { EmployeeManager } from '../../schema/Employee'
import useColabContext from '../../context_api'
import { YourAbsence } from './Absence'
import { YourDocuments } from './Documents'
import CardHeaderUser from '../../components/CardHeaderUser'

const YourRequests = () => {
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
      {data &&
        (<CardHeaderUser name={data.name} photo={data.photo} role={data.Contract && data.Contract[0].Role
            ? data.Contract[0].Role.description
            : 'N/A'} status={'ACTIVO'} />
        )}

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
              <Tab>Ausências</Tab>
              <Tab>Documentos</Tab>
            </TabList>

            {data ? (
              <TabPanels width="100%">
                <TabPanel m={0} p={0}>
                  <YourAbsence />
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <YourDocuments />
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

export default YourRequests
