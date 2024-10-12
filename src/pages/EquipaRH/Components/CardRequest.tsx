import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { List } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { toast } from 'react-toastify'
import { IManagerEmployeesAbsence } from '../../../schema/Employee'
import { organizedData } from '../../../utils/convertDatas'
import { chooseStatusColor } from '../../../components/RequestForm/utils'
import { RequestFormEdit } from '../../../components/RequestForm/Edit/edit'
import { homeCardRequestByIdService } from '../../../services/Home/homeRequest'
import { Modal } from '../../../components/Forms/Modal'
import getAllRequestByRHService from '../../../services/Employee/get-request-rh.service'
import { IHomeCardRequestById } from '../../../schema/HomeCard'
import { organizeDetailRequest } from '../transform'
import useSolicitation from '../../../hooks/useSolicitation'
import { pathStaticFilesUserProfile } from '../../../utils/pathStaticFiles'
import { CardRequestItem } from './CardRequestItem'
import { RequestFormEditRH } from '../../../components/RequestFormRH/Edit/edit'

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
        const status = showAll ? null : 'PENDING'
        const departamentId =
          departamentSelected === 0 ? null : departamentSelected
        const absenceId = requestType === 0 ? null : requestType

        const response = await getAllRequestByRHService(
          status,
          departamentId,
          absenceId,
        )

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
                <Flex width={'100%'} flex={1}>
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, lg: 4 }}
                    spacingX={2}
                    spacingY={5}
                    width={'100%'}
                  >
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
                            // duration={organizeRangeDate(item.date_start, item.date_end)}
                            duration={`${item.date_start} | ${item.date_end}`}
                            detalhe={organizeDetailRequest(
                              String(item.number_of_days),
                              item.AbsencePeriod[0].text,
                            )}
                            status={item.status}
                            statusColor={chooseStatusColor(item.status)}
                            created={organizedData(item.created_at)}
                            handleClickCard={() => handleClickCard(item.id)}
                          />
                        )
                      },
                    )}
                  </SimpleGrid>
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
        description={'Por favor, analisa os detalhes e Aprova ou Rejeita a solicitação.'}
        size={'lg'}
      >
        <RequestFormEditRH
          handleCloseModal={handleCloseModal}
          data={absenceById}
          canEdit={false}
        />
      </Modal>
    </>
  )
}
