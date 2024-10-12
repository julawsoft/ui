import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { List } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { CardRequestItem } from './CardRequestItem'
import getLideradosRequestByManagerService from '../../../services/Employee/get-lidarandos-request-by-manager-id.service'
import { toast } from 'react-toastify'
import { IManagerEmployeesAbsence } from '../../../schema/Employee'
import { organizeRangeDate, organizedData } from '../../../utils/convertDatas'
import { chooseStatusColor } from '../../../components/RequestForm/utils'
import { RequestFormEdit } from '../../../components/RequestForm/Edit/edit'
import { homeCardRequestByIdService } from '../../../services/Home/homeRequest'
import { Modal } from '../../../components/Forms/Modal'
import { ENUN_REQUEST, factoryStatus } from '../utils'
import getLideradosRequestPendenteByManagerService from '../../../services/Employee/get-lidarandos-request-pendente-by-manager-id.service'
import { IHomeCardRequestById } from '../../../schema/HomeCard'
import useColabContext from '../../../context_api'
import { organizeDetailRequest } from '../transform'
import useSolicitation from '../../../hooks/useSolicitation'
import { pathStaticFilesUserProfile } from '../../../utils/pathStaticFiles'

type CardRequestType = {
  showAll: boolean
}
export function CardRequest({ showAll }: CardRequestType) {
  // const navigate = useNavigate()
  const { colabProvider } = useColabContext()
  const [absenceById, setAbsenceById] = useState<IHomeCardRequestById>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoadingRequest, SetIsLoadingRequest] = useState<boolean>(false)

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

  const [ReloadSolicitacao, setReloadSolicitacao] = useSolicitation((state) => [
    state.ReloadSolicitacao,
    state.setReloadSolicitacao,
  ])
  const [reload, setReload] = useState<boolean>(false)

  useSolicitation.subscribe((state) => setReload(state.ReloadSolicitacao))

  useEffect(() => {
    if (reload) handleReload()
    init()
  }, [showAll, reload])

  const init = () => {
    showAll ? getAllRequestByLeader() : getPendenteRequestByLeader()
  }

  const handleReload = () => {
    init()
    setTimeout(() => {
      setReloadSolicitacao(false)
    }, 1000)
  }

  const getAllRequestByLeader = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await getLideradosRequestByManagerService()
        console.log('>>>>>>>> ',response)
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

  const getPendenteRequestByLeader = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await getLideradosRequestPendenteByManagerService(
          Number(colabProvider.user.id),
        )
        console.log('>>>>>>>> d',response)
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
    SetIsLoadingRequest(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestByIdService(id)
        setAbsenceById(response.data)
        setIsOpen(true)
        SetIsLoadingRequest(false)
      } catch (error) {
        toast.error(String(error))
        SetIsLoadingRequest(false)
      }
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
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
                <Flex flex={'1'} flexWrap={'wrap'} gap={4} maxHeight={'1250px'} overflow={'hidden'} >
                  {data?.map(
                    (item: IManagerEmployeesAbsence, index: number) => {
                      return (
                        <CardRequestItem
                          isLoading={isLoadingRequest}
                          key={index}
                          name={item.Employee.name}
                          image={pathStaticFilesUserProfile(item.Employee.photo)}
                          role={
                            item.Employee.Contract && item.Employee.Contract[0]
                              ? item.Employee.Contract[0].Role.description
                              : 'Não definida'
                          }
                          requestType={item.ReasonAbsence.description}
                          duration={organizeRangeDate(
                            item.date_start,
                            item.date_end,
                          )}
                          detalhe={organizeDetailRequest(
                            String(item.number_of_days),
                            item.AbsencePeriod[0].text,
                          )}
                          status={factoryStatus(item)}
                          statusColor={chooseStatusColor(
                            item.status !== ENUN_REQUEST.CANCELLED
                              ? item.status_manager
                                ? ENUN_REQUEST.APPROVED
                                : ENUN_REQUEST.PENDING
                              : item.status,
                          )}
                          created={organizedData(item.created_at)}
                          handleClickCard={() => handleClickCard(item.id)}
                        />
                      )
                    },
                  )}
                </Flex>
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
        description={'Por favor, analisa os detalhes e Aprova ou Rejeita a solicitação'}
        size={'lg'}
      >
        <RequestFormEdit
          handleCloseModal={handleCloseModal}
          data={absenceById ?? undefined}
          canEdit={false}
        />
      </Modal>
    </>
  )
}
