import { useEffect, useState } from 'react'
import { IHomeCardRequestById } from '../../../../schema/HomeCard'
import useAsyncState from '../../../../hooks/use-async-state'
import { IManagerEmployeesAbsence } from '../../../../schema/Employee'
import useSolicitation from '../../../../hooks/useSolicitation'
import getAllRequestByRHService from '../../../../services/Employee/get-request-rh.service'
import { toast } from 'react-toastify'
import { homeCardRequestByIdService } from '../../../../services/Home/homeRequest'
import { Badge, Box, Flex, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { LoaderLocal } from '../../../../components/LoaderLocal'
import { ErrorLocal } from '../../../../components/ErrorLocal'
import { EmptyEvent } from '../../../../components/EmptyEvent'
import { Modal } from '../../../../components/Forms/Modal'
import { RequestFormEdit } from '../../../../components/RequestForm/Edit/edit'
import { Calendar, List } from 'phosphor-react'
import { CardYourRequest } from '../../Components/CardRequest'
import { translate } from '../../../../utils/language/pt'
import getAllRequestByEmployeeService from '../../../../services/Employee/get-request-employee'
import useColabContext from '../../../../context_api'
import { ENUN_MSG_REQUET, ENUN_REQUEST } from '../utils'

type CardRequestType = {
  showAll: boolean
  requestType: number | null
  departamentSelected: number | null
}

export function CardRequest({
  showAll,
  requestType = null,
  departamentSelected = null,
}: CardRequestType) {


  const { colabProvider } = useColabContext()

  const [absenceById, setAbsenceById] = useState<IHomeCardRequestById>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<IManagerEmployeesAbsence[]>()

  const [reload, setReload] = useState<boolean>(false)
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false)
  const [haveLeader, setHaveLeader] = useState<boolean>(true)

  useSolicitation.subscribe((state) => setReload(state.ReloadSolicitacao))

  const [ReloadSolicitacao, setReloadSolicitacao] = useSolicitation((state) => [
    state.ReloadSolicitacao,
    state.setReloadSolicitacao,
  ])

  useEffect(() => {
    if (reload) handleReload()
    init()
  }, [showAll, requestType, departamentSelected, reload])

  const init = () => {
    getAllRequestByRH()
  }

  const handleReload = () => {
    init()
    setTimeout(() => {
      setReloadSolicitacao(false)
    }, 1000)
  }

  const getAllRequestByRH = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const status = showAll ? '' : 'PENDING'
        const response = await getAllRequestByEmployeeService(
          colabProvider.user.id,
          status,
        )

        console.log("response", response)

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

  const handleClickCard = (id: number) => {
    setIsLoadingRequest(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestByIdService(id)
        setAbsenceById(response.data)
        setIsOpen(true)
        setIsLoadingRequest(false)
      } catch (error) {
        toast.error(String(error))
        setIsLoadingRequest(false)
      }
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    // init()
  }

  return (
    <>
      <Flex
        width={'100%'}
        position={'relative'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex width={'100%'} gap={2} flexWrap={'wrap'}>
          {error === true && !loading ? (
            <ErrorLocal message={message} reload={handleReload} />
          ) : loading ? (
            <>
              <LoaderLocal />
            </>
          ) : (
            <>
              {data && data.length ? (
                <Grid templateColumns={'1fr'} width={'100%'} gap={8}>
                  <GridItem>
                    <SimpleGrid
                      columns={{ sm: 2, md: 3, lg: 3 }}
                      spacing="10px"
                    >
                      {
                        data.map((item: IManagerEmployeesAbsence) => (
                          <CardYourRequest
                            key={item.id}
                            icon={<Calendar size={32} />}
                            solicitacao={item.ReasonAbsence.description}
                            created={item.created_at}
                            status={translate(item.status)}
                            statusColor={ 
                                item.status === ENUN_MSG_REQUET.APPROVED ? 'green' 
                                :
                                item.status === ENUN_MSG_REQUET.REJECTED || item.status === ENUN_MSG_REQUET.CANCELLED 
                                ? 'red' : 'gray'
                              }
                            duracao={`${item.number_of_days} - dia(s)`}
                            attach={item.attach}
                            isApproved={item.status !== ENUN_REQUEST.PENDING}
                            handleEdit={function (): void {
                              throw new Error('Function not implemented.')
                            }} handleDelete={function (): void {
                              throw new Error('Function not implemented.')
                            }} handleViewAttach={function (): void {
                              throw new Error('Function not implemented.')
                            }}
                            children={
                              <Flex bgColor={'#f2f2f2'} justifyContent={'space-between'} width={'100%'}>
                                {
                                  haveLeader ? (
                                    <Flex alignItems={'center'} gap={2}>
                                      <Box color={'gray.400'}>
                                        <Text fontSize={'10px'} fontWeight={'semibold'}>Manager</Text>
                                      </Box>
                                      <Box>
                                        <Badge variant='outline' colorScheme='gray'>
                                          <Text fontSize={'8px'}>{item.status_manager ? translate(ENUN_REQUEST.APPROVED) : translate(ENUN_REQUEST.PENDING)}</Text>
                                        </Badge>
                                      </Box>
                                    </Flex>) : (null)
                                }
                                <Flex alignItems={'center'} gap={2}>
                                  <Box color={'gray.400'}>
                                    <Text fontSize={'10px'} fontWeight={'semibold'}>RH</Text>
                                  </Box>
                                  <Box>
                                    <Badge variant='outline' colorScheme='gray'>
                                      <Text fontSize={'8px'}>{translate(item.status)}</Text>
                                    </Badge>
                                  </Box>
                                </Flex>
                              </Flex>
                            }></CardYourRequest >
                        ))}
                    </SimpleGrid>
                  </GridItem>
                </Grid>
              ) : (
                <>
                  <EmptyEvent
                    icon={<List size={22} />}
                    title={'Nenhuma solicitação recebida...'}
                    bgColor={'#fffff'}
                  />
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={'Gestão de Ausências'}
        description={'Por favor, analisa os detalhes e Aprova ou Rejeita a solicitação.'}
        size={'lg'}
      >
        <RequestFormEdit
          handleCloseModal={handleCloseModal}
          data={absenceById}
          canEdit={false}
        />
      </Modal>
    </>
  )
}
