import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SpinnerProgress from '../../components/SpinnerProgress'
import { ErrorLocal } from '../../components/ErrorLocal'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'
import { NavFloat } from '../../components/Navs/NavFloat'
import { ArrowLeft, PaperclipHorizontal } from 'phosphor-react'
import { CircleLink } from '../../components/Navs/CircleLink'
import useAsyncState from '../../hooks/use-async-state'
import { homeCardRequestByIdService } from '../../services/Home/homeRequest'
import { IHomeCardRequestById } from '../../schema/HomeCard'
import { StatusDetailsRequest } from './Components/Status'
import { DisplayDate } from './util'
import { Point } from './Components/Point'
import { ENUN_REQUEST } from '../Home/utils'

export default function RequestDetails() {
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<IHomeCardRequestById>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestByIdService(location.state.id)
        setData(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const location = useLocation()

  const handleReload = () => init()

  /*
  const handleRequestReview = (requestId: number, userId: number) => {
    setTimeout(async () => {
      try {
        const response = await requestReview(requestId, userId)
        if (response.response.statusCode === 200)
          toast.success('Solicitação enviada com sucesso!')
        else toast.error(response.response.message)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }
  */

  const handleViewAnexoSelected = () => {
    const path = `${import.meta.env.VITE_BASE_URI}open_absence_attach/${
      data?.attach
    }`
    window.open(path, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <HeaderWithNav title={`Detalhes da Solicitação`}>
        <NavFloat side="left">
          <CircleLink
            href={location.state.back}
            icon={<ArrowLeft size={20} />}
            color="gray.200"
          />
        </NavFloat>
      </HeaderWithNav>

      <Flex
        width={'100%'}
        height={'100%'}
        position={'relative'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex width={'100%'} height={'100%'}>
          {error === true && !loading ? (
            <ErrorLocal message={message} reload={handleReload} />
          ) : loading ? (
            <>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
              >
                <SpinnerProgress />
              </Flex>
            </>
          ) : (
            <>
              <Flex p={6} flexDirection={'column'} gap={4} width={'100%'}>
                {data ? (
                  <>
                    <Flex flexDirection={'column'} width={'100%'}>
                      <Flex gap={2} flexDirection={'column'} width={'100%'}>
                        <Flex
                          width={'100%'}
                          justifyContent={'start'}
                          alignItems={'center'}
                        >
                          <Box p={6} fontWeight={'semibold'}>
                            <StatusDetailsRequest
                              p="12px"
                              status={data.status}
                            />
                          </Box>
                          <Point />
                          <Flex>
                            <Text>Solicitação criada em </Text>
                            <Text ml={1}>{DisplayDate(data.created_at)}</Text>
                          </Flex>
                          <Point />
                        </Flex>
                        <Flex>
                          <Text
                            fontSize={40}
                            fontWeight={'medium'}
                            textColor={'#25282A'}
                          >
                            {data.Employee.name}
                          </Text>
                        </Flex>
                        <Flex gap={4} width={'100%'}>
                          <Flex gap={1}>
                            <Text textColor={'#989898'}>Função: </Text>
                            <Text textColor={'#5A5A66'}>
                              {data.Employee.Contract[0].Role.description}
                            </Text>
                            <Point />
                          </Flex>
                          <Flex gap={1}>
                            <Text textColor={'#989898'}>Departamento: </Text>
                            <Text textColor={'#5A5A66'}>
                              {'Nenhum informado'}
                            </Text>
                            <Point />
                          </Flex>
                          <Flex gap={1}>
                            <Text textColor={'#989898'}>
                              Superior Hierárquico:{' '}
                            </Text>
                            <Text textColor={'#5A5A66'}>
                              {data.Manager_Employee
                                ? data.Manager_Employee.name
                                : 'Nenhum Manager'}
                            </Text>
                            <Point />
                          </Flex>
                        </Flex>
                      </Flex>
                      <Box
                        border={'.5px solid #D9D9D9'}
                        mt={4}
                        mb={4}
                        width={'100%'}
                      ></Box>
                      <Box borderBottom={'.5px solid #b3b5c6'} mb={4} pb={4}>
                        <Flex gap={4} flexDirection={'column'}>
                          <Flex gap={1} alignItems={'center'}>
                            <Text textColor={'#989898'}>
                              Tipo de Solicitação:{' '}
                            </Text>
                            <Text
                              textColor={'#5A5A66'}
                              fontSize={16}
                              fontWeight={'semibold'}
                            >
                              {data.ReasonAbsence.description}
                            </Text>
                          </Flex>
                          <Flex gap={1} alignItems={'center'}>
                            <Text textColor={'#989898'}>Nota: </Text>
                            <Text textColor={'#5A5A66'} fontSize={14} as={'p'}>
                              {data.notes ?? 'Nenhuma nota foi adicionada'}
                            </Text>
                          </Flex>
                        </Flex>
                        <Box mt={2}>
                          <Flex alignItems={'center'} gap={2}>
                            <Text>Anexo</Text>
                            <PaperclipHorizontal size={22} />
                          </Flex>
                          {data?.attach ? (
                            <>
                              <Flex
                                gap={2}
                                alignItems={'center'}
                                title="Visualizar anexo"
                                onClick={handleViewAnexoSelected}
                                cursor={'pointer'}
                              >
                                <Text color={'#C2912E'}>{data?.attach}</Text>
                              </Flex>
                            </>
                          ) : (
                            <>
                              <Text fontSize={10} fontWeight={'regular'}>
                                Nenhum anexo!
                              </Text>
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        {data?.ReasonAbsence.is_manager_required ||
                        data?.status_manager ? (
                          <Accordion
                            allowToggle
                            border={'transparent'}
                            defaultIndex={[0]}
                          >
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <Flex
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                    alignItems={'center'}
                                  >
                                    <Text fontWeight={'medium'}>
                                      Superior Hierárquico
                                    </Text>
                                    <Badge
                                      colorScheme={
                                        data.status === ENUN_REQUEST.PENDING &&
                                        data?.status_manager === null
                                          ? 'gray'
                                          : data?.status_manager
                                          ? 'green'
                                          : 'red'
                                      }
                                    >
                                      {' '}
                                      {data.status === ENUN_REQUEST.PENDING &&
                                      data?.status_manager === null
                                        ? ENUN_REQUEST.PENDING
                                        : data?.status_manager
                                        ? 'APPROVED'
                                        : 'REJECTED'}
                                    </Badge>
                                  </Flex>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                <Flex
                                  flexDirection={'column'}
                                  p={2}
                                  border={'1px solid #f2f2f2'}
                                  bgColor={'#f2f2f2'}
                                >
                                  <Box mb={2}>
                                    <Text
                                      _hover={{ textDecoration: 'underline' }}
                                      cursor={'pointer'}
                                      title="Ver Perfil"
                                    >
                                      {data?.feedback && data?.feedback[0]
                                        ? data?.feedback[0].Employee.name
                                        : data?.Manager_Employee
                                        ? data?.Manager_Employee.name
                                        : 'Não definido'}
                                    </Text>
                                  </Box>
                                  <Flex flexDirection={'column'} gap={1}>
                                    <Flex flexDirection={'column'}>
                                      <Text fontWeight={'semibold'}>Nota</Text>
                                      <Text bgColor={'#f2f2f2'}>
                                        {data?.feedback && data?.feedback[0] ? (
                                          data?.feedback[0].feedback
                                        ) : (
                                          <Text
                                            fontSize={11}
                                            fontWeight={'light'}
                                          >
                                            Nenhuma nota
                                          </Text>
                                        )}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                </Flex>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        ) : null}

                        <Accordion
                          allowToggle
                          border={'transparent'}
                          defaultIndex={[1]}
                        >
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Flex
                                  justifyContent={'space-between'}
                                  width={'100%'}
                                  alignItems={'center'}
                                >
                                  <Text fontWeight={'medium'}>
                                    Recursos Humanos
                                  </Text>
                                  <Badge
                                    colorScheme={
                                      data.status === ENUN_REQUEST.PENDING
                                        ? 'gray'
                                        : data.status === ENUN_REQUEST.APPROVED
                                        ? 'green'
                                        : 'red'
                                    }
                                  >
                                    {' '}
                                    {data?.status ?? 'PENDING'}
                                  </Badge>
                                </Flex>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <Flex
                                flexDirection={'column'}
                                p={2}
                                border={'1px solid #f2f2f2'}
                                bgColor={'#f2f2f2'}
                              >
                                <Box mb={2}>
                                  <Text
                                    _hover={{ textDecoration: 'underline' }}
                                    cursor={'pointer'}
                                    title="Ver Perfil"
                                  >
                                    {data?.feedback && data?.feedback[1] ? (
                                      data?.feedback[1].Employee.name
                                    ) : data.status ===
                                      ENUN_REQUEST.REJECTED ? (
                                      <Text color={'red'}>
                                        Rejeitado pelo Superior Hierárquico
                                      </Text>
                                    ) : (
                                      'Não definido'
                                    )}
                                  </Text>
                                </Box>
                                <Flex flexDirection={'column'} gap={1}>
                                  <Flex flexDirection={'column'}>
                                    <Text fontWeight={'semibold'}>Nota</Text>
                                    <Text
                                      bgColor={'#f2f2f2'}
                                      fontSize={11}
                                      fontWeight={'light'}
                                    >
                                      {data?.feedback && data?.feedback[1]
                                        ? data?.feedback[1].feedback
                                        : 'Nenhuma nota'}
                                    </Text>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Box>
                    </Flex>
                  </>
                ) : null}
              </Flex>
            </>
          )}
        </Flex>
        <Flex></Flex>
      </Flex>
    </>
  )
}
