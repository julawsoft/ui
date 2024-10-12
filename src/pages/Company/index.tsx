import { useEffect } from 'react'
import {
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
import { CompanyDocument } from './Documents'
import CardHeaderUser from '../../components/CardHeaderUser'
import CpompanyMissao from './Missao'
import CpompanyOrganograma from './Organograma'


const Company = () => {

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
    // init()
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
              <Tab>Empresa</Tab>
              <Tab>Oranograma</Tab>
              <Tab>Documentos</Tab>
            </TabList>

            {!data ? (
              <TabPanels width="100%">
                <TabPanel m={0} p={0}>
                  <CpompanyMissao employee={[]} />
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <CpompanyOrganograma />
                </TabPanel>
                <TabPanel m={0} p={0}>
                  <CompanyDocument employee={undefined} />
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

export default Company
