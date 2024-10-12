import { SimpleGrid, Button, Flex, Box, Text } from '@chakra-ui/react'
import { Select } from '../../Forms/Select'
import { useForm } from 'react-hook-form'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../../Forms/textarea'
import { Input } from '../../Forms/Input'
import { ChangeEvent, useEffect, useState } from 'react'
import { requestTypesService } from '../../../services/Home/requestType'
import { toast } from 'react-toastify'
import {
  IHomeCardRequestById,
  IRequest,
  IRequestType,
} from '../../../schema/HomeCard'
import useColabContext from '../../../context_api'
import { ENUN_REQUEST } from '../../../pages/Home/utils'
import {
  homeCardRequestChangeStatusService,
  homeCardRequestChangeStatusServiceSH,
  homeCardRequestUpdateService,
} from '../../../services/Home/homeRequest'
import { GitDiff } from 'phosphor-react'
import { GroupsPermissions } from '../../../utils/groups'
import { Loader } from '../../Loader'
import { RequestFormApprove } from './Components/Approve'
import useSolicitation from '../../../hooks/useSolicitation'

export interface RequestType {
  id: string | number
  description: string
}

interface RequestItem {
  handleCloseModal: () => void
  data: IHomeCardRequestById | undefined
  canEdit: boolean
}

const promoveUserSchema = z.object({
  request_type_id: z
    .number({
      required_error: 'Tipo de Solicitação é necessário',
      invalid_type_error: 'Campo obrigatório',
    })
    .nonnegative('Campo obrigatório'),
  start_date: z.string().min(10, 'Campo obrigatório'),
  note: z.string(),
})

interface DurationState {
  isHalfDay: boolean
  isLonge: boolean
}

interface DurationStateSelected {
  isHalfDay: boolean
  isLonger: boolean
  isOneDay: boolean
  isMornning: boolean
  isAfternoon: boolean
  isLongerExtended: boolean
}

type PromoveUserSchemaInputs = z.infer<typeof promoveUserSchema>

interface IAnexoUpload {
  isFile: boolean
  target: string
  name: string
  size: string
}

export function RequestFormEdit({
  handleCloseModal,
  data,
  canEdit,
}: RequestItem) {
  const { colabProvider } = useColabContext()

  const [durationState, setDurationState] = useState<DurationState>({
    isHalfDay: data?.AbsencePeriod[0].is_half_day ?? false,
    isLonge: data?.AbsencePeriod[0].is_longer ?? false,
  })

  const [setReloadSolicitacao] = useSolicitation((state) => [
    state.setReloadSolicitacao,
  ])

  const [isLoadin, setIsLoading] = useState<boolean>(false)
  const [isOpenModalFeedback, setIsOpenModalFeedback] = useState<boolean>(false)

  const [requestType, setRequestType] = useState<RequestType[]>([])
  const [endDate, setEndDate] = useState<string>(
    String(data?.date_end.substring(0, 10)),
  )

  const [feedBackReject, setFeedbBackReject] = useState<string>('')

  const [anexoSelected, setAnexoSelected] = useState<IAnexoUpload>({
    isFile: false,
    target: '',
    name: '',
    size: '',
  })

  const [uploadIsRequired, setUploadIsRequired] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(async () => {
      const response = await requestTypesService()
      setRequestType(response as IRequestType[])
    }, 500)
  }, [])

  const [durationStateSelected, setDurationStateSelected] =
    useState<DurationStateSelected>({
      isHalfDay: data?.AbsencePeriod[0].is_half_day ?? false,
      isLonger: data?.AbsencePeriod[0].is_longer ?? false,
      isOneDay: data?.AbsencePeriod[0].is_one_day ?? false,
      isMornning: data?.AbsencePeriod[0].is_morning ?? false,
      isAfternoon: data?.AbsencePeriod[0].is_afternoon ?? false,
      isLongerExtended: data?.AbsencePeriod[0].is_longer_extended ?? false,
    })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PromoveUserSchemaInputs>({
    resolver: zodResolver(promoveUserSchema),
  })

  async function handleSendRequest(dataInputs: PromoveUserSchemaInputs) {


    const dataInicial = new Date(dataInputs.start_date)

    if (uploadIsRequired && !anexoSelected.isFile) {
      return toast.error('Tipo de Solicitação, necessita de Anexo!')
    }

    if (durationStateSelected.isLonger && endDate?.length === 0) {
      return toast.error('Data Final, é obrigatoria')
    }

    if (new Date(endDate) < new Date(dataInicial)) {
      return toast.error('Data Final deve ser igual ou superior a Data Inicial')
    }

    function makeTextDuration() {
      if (durationStateSelected.isHalfDay && durationStateSelected.isMornning) {
        return 'Meio dia - manhã'
      }
      if (
        durationStateSelected.isHalfDay &&
        durationStateSelected.isAfternoon
      ) {
        return 'Meio dia - tarde'
      }
      if (durationStateSelected.isOneDay) {
        return 'Todo o dia'
      }
      if (durationStateSelected.isLonger) {
        return 'Ausência Prolongada'
      }
    }

    const dataToSave: IRequest = {
      employee_id: colabProvider.user.id,
      reason_absence_id: dataInputs.request_type_id,
      date_start: `${dataInputs.start_date}`,
      date_end: endDate === '' ? `${dataInputs.start_date}` : `${endDate}`,
      notes: dataInputs.note,
      is_afternoon: durationStateSelected.isAfternoon,
      is_half_day: durationStateSelected.isHalfDay,
      is_longer: durationStateSelected.isLonger,
      is_longer_extended: durationStateSelected.isLongerExtended,
      is_morning: durationStateSelected.isMornning,
      is_one_day: durationStateSelected.isOneDay,
      text: String(makeTextDuration()),
      attach: anexoSelected.isFile ? anexoSelected.target : data?.attach,
    }

    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestUpdateService(
          Number(data?.id),
          dataToSave,
        )
        if(response) {
          if (response.response.statusCode === 200) {
            toast.success('Solicitção enviada com Sucesso!')
            reset()
            resetStates()
            handleCloseModal()
            // atua lizar as solicitacoes
            setReloadSolicitacao(true)
          }
        }
      } catch (error) {
        toast.error(String(error))
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const resetStates = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isHalfDay: false,
      isLonger: false,
      isOneDay: false,
      isMornning: false,
      isAfternoon: false,
      isLongerExtended: false,
    })

    setDurationState({
      ...durationState,
      isHalfDay: false,
      isLonge: false,
    })
  }

  const handleActiveHalfDay = () => {
    setDurationState({
      ...durationState,
      isHalfDay: !durationState.isHalfDay,
      isLonge: false,
    })
    setDurationStateSelected({
      ...durationStateSelected,
      isHalfDay: !durationStateSelected.isHalfDay,
      isLonger: false,
      isOneDay: false,
    })
  }

  const handleActiveLonger = () => {
    setDurationState({
      ...durationState,
      isLonge: !durationState.isLonge,
      isHalfDay: false,
    })
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: false,
      isMornning: false,
      isLonger: !durationStateSelected.isLonger,
      isAfternoon: false,
      isLongerExtended: false,
    })
  }

  const handleActiveOneDay = () => {
    setDurationState({
      ...durationState,
      isLonge: false,
      isHalfDay: false,
    })
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: !durationStateSelected.isOneDay,
      isMornning: false,
      isLonger: false,
      isAfternoon: false,
      isLongerExtended: false,
    })
  }

  const handleActiveLongerItem = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isOneDay: false,
      isMornning: false,
      isAfternoon: false,
      isLongerExtended: !durationStateSelected.isLongerExtended,
    })
  }

  const handleActiveHalfDayMorning = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isMornning: !durationStateSelected.isMornning,
      isLonger: false,
      isOneDay: false,
      isAfternoon: false,
      isLongerExtended: false,
    })
  }

  const handleActiveHalfDayAfernoom = () => {
    setDurationStateSelected({
      ...durationStateSelected,
      isAfternoon: !durationStateSelected.isAfternoon,
      isLonger: false,
      isOneDay: false,
      isMornning: false,
      isLongerExtended: false,
    })
  }

  const handleChangeStatusRequest = (status: string) => {
    if (status === ENUN_REQUEST.REJECTED && feedBackReject === '') {
      toast.warn('Nota da rejeição (Obrigatória)')
      setIsOpenModalFeedback(true)
      return 0
    }
    if (colabProvider.auth.profile === GroupsPermissions.LIDER || colabProvider.auth.profile === GroupsPermissions.RH_LEADER) {
      handleChangeStatusRequestSH(
        Number(data?.id),
        colabProvider.user.id,
        status,
        feedBackReject,
      )
    } else {
      handleChangeStatusRequestRH(
        Number(data?.id),
        colabProvider.user.id,
        status,
        feedBackReject,
      )
    }
  }

  const handleChangeStatusRequestRH = (
    requestId: number,
    userId: number,
    status: string,
    feedback: string,
  ) => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestChangeStatusService(
          requestId,
          userId,
          status,
          feedback,
        )
        if(response){

          if (response.response.statusCode === 200) {
            toast.success('Solicitação enviada com Sucesso!')
            handleCloseModal()
            // atua lizarSolicitations(colabProvider.user.id)
            setReloadSolicitacao(true)
            // setColabProvider({
              //  ...colabProvider,
              //  refreshHomePage: !colabProvider.refreshHomePage,
              // })
            } else {
              toast.error(response.response.message)
            }
          }
      } catch (error) {
        toast.error(String(error))
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleChangeStatusRequestSH = (
    requestId: number,
    userId: number,
    status: string,
    feedback: string,
  ) => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestChangeStatusServiceSH(
          requestId,
          userId,
          status,
          feedback,
        )

        if(response){

          if (response.response.statusCode === 200) {
            toast.success('Solicitação enviada com Sucesso!')
            handleCloseModal()
            // atua lizarSolicitations(colabProvider.user.id)
            setReloadSolicitacao(true)
            // setColabProvider({
              //  ...colabProvider,
              //  refreshHomePage: !colabProvider.refreshHomePage,
              // })
            } else {
              toast.error(response.response.message)
            }
          }
      } catch (error) {
        toast.error(String(error))
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleViewAnexoSelected = () => {
    const path = `${import.meta.env.VITE_BASE_URI}open_absence_attach/${
      data?.attach
    }`
    window.open(path, '_blank', 'noopener,noreferrer')
  }

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setAnexoSelected({
          ...anexoSelected,
          isFile: true,
          name: file.name,
          size: file.size,
          target: reader.result?.toString() || '',
        })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function handleInputFile() {
    document.getElementById('inputFileRef')?.click()
  }

  const handleChangeTypeRequest = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value
    const typeRequestSelect: any = requestType.find(
      (item) => Number(item.id) === Number(value),
    )
    setUploadIsRequired(
      typeRequestSelect !== undefined ? typeRequestSelect.anexoRequired : false,
    )
    if (typeRequestSelect.isExtended) handleActiveLonger()
  }

  const handleSetFeedbBackReject = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value
    setFeedbBackReject(value)
  }

  return (
    <>
      {isLoadin ? (
        <>
          <Loader />
        </>
      ) : null}
      <form onSubmit={handleSubmit(handleSendRequest)}>
        <SimpleGrid columns={1} spacing={4}>
          {!canEdit ? (
            <RequestFormApprove
              data={data}
              handleViewAnexoSelected={handleViewAnexoSelected}
              isOpenModalFeedback={isOpenModalFeedback}
              feedBackReject={feedBackReject}
              setFeedbBackReject={handleSetFeedbBackReject}
            />
          ) : (
            <>
              <Select
                label="Tipo de Solicitação"
                data={convertDataToSelect(requestType, 'description')}
                {...register('request_type_id')}
                error={errors.request_type_id}
                defaultValue={data?.reason_absence_id}
                isDisabled={!canEdit}
                onChange={handleChangeTypeRequest}
              />
              <Input
                label="Data de Início"
                {...register('start_date', { required: true })}
                error={errors.start_date}
                type="date"
                isDisabled={!canEdit}
                defaultValue={data?.date_start.substring(0, 10)}
              />
              <Flex flexDirection={'column'}>
                <Text>Duração</Text>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  height={'48px'}
                >
                  {!durationState.isHalfDay && durationState.isLonge ? null : (
                    <Box
                      border={'1px solid #c3c3c3'}
                      borderRadius={'8px 0 0 8px'}
                      width={'100%'}
                      p={2}
                      textAlign={'center'}
                      onClick={handleActiveHalfDay}
                      height={'48px'}
                      alignContent={'center'}
                      bgColor={durationStateSelected.isHalfDay ? '#26282a' : ''}
                      color={durationStateSelected.isHalfDay ? 'white' : ''}
                    >
                      Meio Dia
                    </Box>
                  )}
                  {durationState.isHalfDay ? (
                    <>
                      <Box
                        border={'1px solid #c3c3c3'}
                        width={'100%'}
                        textAlign={'center'}
                        p={2}
                        height={'48px'}
                        alignContent={'center'}
                        bgColor={
                          durationStateSelected.isMornning ? '#d79e2e' : ''
                        }
                        onClick={handleActiveHalfDayMorning}
                      >
                        Manhã
                      </Box>
                      <Box
                        border={'1px solid #c3c3c3'}
                        borderRadius={'0 8px 8px 0'}
                        width={'100%'}
                        textAlign={'center'}
                        p={2}
                        height={'48px'}
                        alignContent={'center'}
                        bgColor={
                          durationStateSelected.isAfternoon ? '#d79e2e' : ''
                        }
                        onClick={handleActiveHalfDayAfernoom}
                      >
                        Tarde
                      </Box>
                    </>
                  ) : null}
                  {durationState.isHalfDay || durationState.isLonge ? null : (
                    <Box
                      textAlign={'center'}
                      border={'1px solid #c3c3c3'}
                      width={'100%'}
                      p={2}
                      height={'48px'}
                      alignContent={'center'}
                      bgColor={durationStateSelected.isOneDay ? '#26282a' : ''}
                      onClick={handleActiveOneDay}
                      color={durationStateSelected.isOneDay ? 'white' : ''}
                    >
                      Todo o Dia
                    </Box>
                  )}
                  {durationState.isLonge ? (
                    <Box
                      width={'100%'}
                      textAlign={'center'}
                      height={'48px'}
                      alignContent={'center'}
                      onClick={handleActiveLongerItem}
                    >
                      <Input
                        type="date"
                        borderRadius={'8px 0 0 8px'}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        isDisabled={!canEdit}
                      />
                    </Box>
                  ) : null}
                  {durationState.isHalfDay ? null : (
                    <Box
                      border={'1px solid #c3c3c3'}
                      borderRadius={'0 8px 8px 0'}
                      width={'100%'}
                      textAlign={'center'}
                      alignContent={'center'}
                      p={2}
                      height={'48px'}
                      onClick={handleActiveLonger}
                      bgColor={durationStateSelected.isLonger ? '#26282a' : ''}
                      color={durationStateSelected.isLonger ? 'white' : ''}
                    >
                      Ausência Prolongada
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Box>
                <Text>Adicione uma nota (opcional)</Text>
                <Textarea
                  backgroundColor={'white'}
                  style={{ borderRadius: '8px' }}
                  rows={4}
                  size="sm"
                  error={errors.note}
                  {...register('note')}
                  defaultValue={
                    data?.notes && !canEdit
                      ? 'Nenhuma nota adicionada pelo Colaborador'
                      : data?.notes
                  }
                  isDisabled={!canEdit}
                />
              </Box>
              <Box>
                <Flex gap={2} alignItems={'center'}>
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg, .pdf"
                    onChange={onSelectFile}
                    id={'inputFileRef'}
                    style={{ display: 'none', width: 'auto' }}
                  />
                  <Text>Anexo</Text>
                </Flex>
                <Flex>
                  {data?.attach || anexoSelected.isFile ? (
                    <Flex gap={2} alignItems={'center'}>
                      <Text
                        color={'#C2912E'}
                        title="Visualizar anexo"
                        onClick={handleViewAnexoSelected}
                        cursor={'pointer'}
                      >
                        {anexoSelected.name || data?.attach
                          ? anexoSelected.name || data?.attach
                          : 'Nenhum anexo encontrado...'}
                      </Text>
                      <Text
                        _hover={{ textDecoration: 'underline' }}
                        title="Trocar o anexo"
                        onClick={handleInputFile}
                        cursor={'pointer'}
                      >
                        <GitDiff size={22} />
                      </Text>
                    </Flex>
                  ) : (
                    <Text fontSize={10} fontWeight={'thin'}>
                      Nenhum anexo adicionado!
                    </Text>
                  )}
                </Flex>
              </Box>
            </>
          )}
        </SimpleGrid>
        <Flex
          justifyContent={'space-between'}
          mt={4}
          borderTop="1px solid #c3c3c3"
          pt={2}
        >
          {canEdit ? (
            <>
              <Button
                onClick={handleCloseModal}
                bgColor={canEdit ? '' : 'red'}
                color={canEdit ? '' : 'white'}
              >
                Cancelar
              </Button>
              <Button colorScheme="green" type="submit">
                {canEdit ? 'Alterar' : 'Validar'}
              </Button>
            </>
          ) : (
            <>
              {data?.ReasonAbsence.is_manager_required ? (
                <>
                  {data?.feedback && data.status_manager ? (
                    <>
                      {
                      colabProvider.auth.profile === GroupsPermissions.RH ||
                      colabProvider.auth.profile === GroupsPermissions.RH_LEADER ||
                      colabProvider.auth.profile === GroupsPermissions.ADMIN ? 
                      (
                        <>
                        {
                          data.status === ENUN_REQUEST.PENDING ? (
                            <>
                            <Button
                            onClick={() =>
                              handleChangeStatusRequest(ENUN_REQUEST.REJECTED)
                            }
                            bgColor={canEdit ? '' : 'red'}
                            color={canEdit ? '' : 'white'}
                          >
                            Rejeitar
                          </Button>
                          <Button
                            colorScheme="green"
                            onClick={() =>
                              handleChangeStatusRequest(ENUN_REQUEST.APPROVED)
                            }
                          >
                            Aprovar
                          </Button>
                            </>
                          ) : (null)
                        }
                          
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {(colabProvider.auth.profile === GroupsPermissions.LIDER || colabProvider.auth.profile === GroupsPermissions.RH_LEADER) &&
                      data?.status === ENUN_REQUEST.PENDING ? (
                        <>
                          <Button
                            onClick={() =>
                              handleChangeStatusRequest(ENUN_REQUEST.REJECTED)
                            }
                            bgColor={canEdit ? '' : 'red'}
                            color={canEdit ? '' : 'white'}
                          >
                            Rejeitar
                          </Button>
                          <Button
                            colorScheme="green"
                            onClick={() =>
                              handleChangeStatusRequest(ENUN_REQUEST.APPROVED)
                            }
                          >
                            Aprovar
                          </Button>
                        </>
                      ) : (
                        <>
                          {data?.status === ENUN_REQUEST.REJECTED || data.status === ENUN_REQUEST.CANCELLED ? null : (
                            <>
                              <Text
                                fontSize={12}
                                fontWeight={'medium'}
                                bgColor={'#484848'}
                                color={'#f2c112'}
                                p={1}
                              >
                                Aguarda feedback da Liderança Diracta
                              </Text>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {
                  colabProvider.auth.profile === GroupsPermissions.LIDER ? null : (
                    <>

                    {
                      data?.status === ENUN_REQUEST.PENDING ? (
                        <>
                        <Button
                        onClick={() =>
                          handleChangeStatusRequestRH(
                            Number(data?.id),
                             colabProvider.user.id,
                             ENUN_REQUEST.REJECTED,
                            feedBackReject
                            )
                        }
                        bgColor={canEdit ? '' : 'red'}
                        color={canEdit ? '' : 'white'}
                      >
                        Rejeitar
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() =>
                          handleChangeStatusRequestRH(
                            Number(data?.id),
                             colabProvider.user.id,
                             ENUN_REQUEST.APPROVED,
                            feedBackReject)
                        }
                      >
                        Aprovars
                      </Button>
                      </>
                      ) : ( null ) }
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Flex>
      </form>
    </>
  )
}
