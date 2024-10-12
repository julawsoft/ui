import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Box, Flex, Text } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { EmptyEvent } from '../../../components/EmptyEvent'
import {
  CardEventRequest,
  CardEventRequestProps,
} from '../../../components/CardEventRequest'
import {
  homeCardRequestByIdService,
  homeCardRequestCancelService,
  homeCardRequestService,
} from '../../../services/Home/homeRequest'
import { transformHomeCardRequest } from '../transform'
import { Calendar } from 'phosphor-react'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { toast } from 'react-toastify'
import { Confirm } from '../../../components/Confirm'
import { Modal } from '../../../components/Forms/Modal'
import { ENUN_MSG_REQUET, ENUN_REQUEST } from '../utils'
import { RequestFormEdit } from '../../../components/RequestForm/Edit/edit'
import { IHomeCardRequestById } from '../../../schema/HomeCard'
import { ROUTES } from '../../../routes/constants'
import { useNavigate } from 'react-router-dom'
import useSolicitation from '../../../hooks/useSolicitation'
import { translate } from '../../../utils/language/pt'

interface CardRequestUserProps {
  userId: number
}

export function CardRequestUser({ userId }: CardRequestUserProps) {
  const navigate = useNavigate()
  const { loading, setLoading, error, setError, message, setMessage } =
    useAsyncState<CardEventRequestProps[]>()

  const [
    solicitacoes,
    adicionarSolicitacao,
    ReloadSolicitacao,
    setReloadSolicitacao,
  ] = useSolicitation((state) => [
    state.solicitacoes,
    state.adicionarSolicitacao,
    state.ReloadSolicitacao,
    state.setReloadSolicitacao,
  ])

  useEffect(() => {
    if (ReloadSolicitacao) {
      return init()
    }
    init()
  }, [ReloadSolicitacao])

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [absenceById, setAbsenceById] = useState<IHomeCardRequestById>()

  const [canEdit, setCanEdit] = useState<boolean>(false)

  const [isLoadingConfirmModal, setIsLoadingConfirmModal] =
    useState<boolean>(false)
  const [chooseEvent, setChooseEvent] = useState<string>(ENUN_REQUEST.PENDING)
  const [chooseEventIdRequest, setChooseEventIdRequest] = useState<number>(0)
  const [titleConfirmModal, setTitleConfirmModal] = useState<string>(
    'Deseja eliminar a Solicitação?',
  )

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestService(userId)
        adicionarSolicitacao(
          transformHomeCardRequest(
            response.data,
            handleAccept,
            handleEdit,
            handleDel,
            userId,
            handleDetails,
          ),
        )
        setReloadSolicitacao(false)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleReload = async () => init()

  const handleAccept = async (idRequest: number) => {
    setTitleConfirmModal(ENUN_MSG_REQUET.APPROVED)
    setIsOpen(true)
    setChooseEvent(ENUN_REQUEST.APPROVED)
    setChooseEventIdRequest(idRequest)
  }

  const handleEdit = async (idRequest: number) => {
    setTitleConfirmModal(ENUN_MSG_REQUET.PENDING)
    setIsOpen(true)
    setChooseEvent(ENUN_REQUEST.PENDING)
    setChooseEventIdRequest(idRequest)
  }

  const handleDel = async (idRequest: number) => {
    setTitleConfirmModal(ENUN_MSG_REQUET.CANCELLED)
    setIsOpen(true)
    setChooseEvent(ENUN_REQUEST.CANCELLED)
    setChooseEventIdRequest(idRequest)
  }

  const handleDetails = (idRequest: number) => {
    navigate(ROUTES.RequestDetails, {
      state: { id: idRequest, back: ROUTES.Home },
    })
  }

  const handleOnAcceptModalConfirm = async () => {
    if (chooseEvent === ENUN_REQUEST.CANCELLED) {
      setIsLoadingConfirmModal(true)
      setTimeout(async () => {
        try {
          const response = await homeCardRequestCancelService(
            chooseEventIdRequest,
            userId,
            chooseEvent,
          )
          toast.success(response.response.message)
          handleOnRejectModalConfirm()
        } catch (error) {
          toast.error(String(error))
          setIsLoadingConfirmModal(false)
        } finally {
          setIsLoadingConfirmModal(false)
        }
      }, 1000)
    } else {
      setIsLoadingConfirmModal(true)
      setTimeout(async () => {
        try {
          const response = await homeCardRequestByIdService(
            chooseEventIdRequest,
          )
          setCanEdit(chooseEvent === ENUN_REQUEST.PENDING)
          setAbsenceById(response.data)
          setIsOpenEdit(true)
          setIsOpen(false)
        } catch (error) {
          toast.error(String(error))
          setIsLoadingConfirmModal(false)
        } finally {
          setIsLoadingConfirmModal(false)
        }
      }, 1000)
    }
  }

  const handleCloseModalConfirm = () => setIsOpen(false)
  const handleOnRejectModalConfirm = () => setIsOpen(false)

  const handleCloseModal = () => {
    setIsOpenEdit(false)
  }

  const handleVerTodas = () => {

  }

  return (
    <Flex
      width={'100%'}
      position={'relative'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex width={'100%'} flexDirection={'column'} gap={2}>
        {error && !loading ? (
          <ErrorLocal message={message} reload={handleReload} />
        ) : loading ? (
          <>
            <LoaderLocal />
          </>
        ) : (
          <>
            <Flex
              flexDirection={'column'}
              gap={2}
              border={'1px solid #C2912E'}
              borderRadius={8}
              p={2}
            >
              <Flex justifyContent={'space-between'}>
                <Text fontWeight={'semibold'} fontSize={'16px'}>
                  Ausênicas Solicitadas
                </Text>
                {
                  /*
                    <Text fontWeight={'regular'} cursor={'pointer'} onClick={handleVerTodas} fontSize={'12px'}>Ver todas</Text>
                  */
                }
              </Flex>
              {solicitacoes && solicitacoes.length ? (
                <>
                  {solicitacoes.map(
                    (item: CardEventRequestProps, index: number) => {
                      return (
                        <CardEventRequest
                          key={index}
                          icon={item.icon}
                          userName={item.userName}
                          date={item.date}
                          status={translate(item.status)}
                          duration={item.duration}
                          bgColor={item.bgColor}
                          borderBottonColor={item.borderBottonColor}
                          handleAccept={item.handleAccept}
                          handleEdit={item.handleEdit}
                          handleDel={item.handleDel}
                          disabelBtn={item.disabelBtn}
                          canEditOrDelete={item.canEditOrDelete}
                          handleDetails={item.handleDetails}
                        />
                      )
                    },
                  )}
                </>
              ) : (
                <>
                  <EmptyEvent
                    icon={<Calendar size={22} />}
                    title={'Nenhuma Solicitação'}
                    bgColor={'#f2f2f2'}
                  />
                </>
              )}
            </Flex>
          </>
        )}
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModalConfirm}
        title="Confirmação"
        description=""
        size={'sm'}
      >
        <Confirm
          title={titleConfirmModal}
          isLoading={isLoadingConfirmModal}
          onAccept={handleOnAcceptModalConfirm}
          onReject={handleOnRejectModalConfirm}
        />
      </Modal>
      <Modal
        isOpen={isOpenEdit}
        onClose={handleCloseModal}
        title={
          chooseEvent === ENUN_REQUEST.APPROVED
            ? 'Gestão de Ausências'
            : 'Edição da Solicitação'
        }
        description={'Defina o tipo Solicitação de acordo a tua necessidade.'}
        size={'lg'}
      >
        <RequestFormEdit
          handleCloseModal={handleCloseModal}
          data={absenceById}
          canEdit={canEdit}
        />
      </Modal>
    </Flex>
  )
}
