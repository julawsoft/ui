import { useEffect, useState } from 'react'
import { IDocumentDTORequest, IHomeCardRequestById } from '../../../../schema/HomeCard'
import useAsyncState from '../../../../hooks/use-async-state'
import useSolicitation from '../../../../hooks/useSolicitation'
import { toast } from 'react-toastify'
import { homeCardRequestDocumentByIdService, homeCardRequestDocumentDeleteService } from '../../../../services/Home/homeRequest'
import { Box, Flex, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { LoaderLocal } from '../../../../components/LoaderLocal'
import { ErrorLocal } from '../../../../components/ErrorLocal'
import { pathStaticFilesUserProfile } from '../../../../utils/pathStaticFiles'
import { DisplayDateAndHourtString, DisplayDateString, organizedData } from '../../../../utils/convertDatas'
import { EmptyEvent } from '../../../../components/EmptyEvent'
import { Modal } from '../../../../components/Forms/Modal'
import { List } from 'phosphor-react'
import useColabContext, { ColabProvider } from '../../../../context_api'
import { CardRequestHome } from '../../../../components/CardRequestHome'
import { FaRegFilePdf } from 'react-icons/fa'
import { translate } from '../../../../utils/language/pt'
import { IValueEditModal } from '../../../Home'
import { RequestFormDocument } from '../../../../components/RequestFormDocument'
import { ENUN_REQUEST } from '../utils'
import { downloadFile } from '../../../../utils/download'


type CardRequestType = {
  showAll: boolean
  requestType: number | null
  departamentSelected: number | null
}

let initialValueEditModal = {id: 0, typeId: 0, description: ''}


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
  } = useAsyncState<IDocumentDTORequest[]>()

  const [reload, setReload] = useState<boolean>(false)
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false)

  useSolicitation.subscribe((state) => setReload(state.ReloadSolicitacao))

  const [ReloadSolicitacao, setReloadSolicitacao] = useSolicitation((state) => [
    state.ReloadSolicitacao,
    state.setReloadSolicitacao,
  ])

  const [isOpenModalDocument, setIsOpenModalDocument] = useState<boolean>(false)
  const [valueEditModal, setValueEditModal] = useState<IValueEditModal>(initialValueEditModal)

  
  useEffect(() => {
    if (reload) handleReload()
    init()
  }, [showAll, reload])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {

        let status = showAll ? '' : ENUN_REQUEST.PENDING
        const response = await homeCardRequestDocumentByIdService(
          colabProvider.user.id, 100, status
        )
        setData(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => {
    init()
    setTimeout(() => {
      setReloadSolicitacao(false)
    }, 1000)
  }


  function handleEdit(item: any /*IValueEditModal*/) {
      setValueEditModal(item)
      setIsOpenModalDocument(true)
  }

  function handleDelete(id: number) {
    setTimeout(async () => {
      try {
        const response = await homeCardRequestDocumentDeleteService(id)
        if (response && response.response.statusCode === 200) {
          toast.success('Eliminida com Sucesso.')
          init()
        } else {
          toast.error(response.response.message)
        }
      } catch (error) {
        setError(true)
        setMessage(String(error))
      }
    }, 1000)
  }

  function handleViewAttach(attach: string) {
    const path = `${import.meta.env.VITE_BASE_URI}open_document/${attach}`
    window.open(path, '_blank', 'noopener,nore')
  }

  const handleCloseModalDocument = () => {
    setIsOpenModalDocument(false)
    setValueEditModal(initialValueEditModal)
  }

  const handleDownloadAttach = (attach: string) => {
    const path = `${import.meta.env.VITE_BASE_URI}open_document/${attach}`
    downloadFile(path, attach)
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
                    {data && data.length ? (
                      <>
                        <SimpleGrid
                          columns={{ sm: 1, md: 2, lg: 3 }}
                          spacing="10px"
                        >

                            {
                              data.map((item: IDocumentDTORequest) => (
                                <Box>
                                  <CardRequestHome
                                    icon={<FaRegFilePdf />}
                                    solicitacao={item.Type_Solicitation_Doc.description}
                                    status={translate(item.status)}
                                    statusText={
                                      item.status === ENUN_REQUEST.APPROVED ? 
                                      'green'
                                      : item.status === ENUN_REQUEST.REJECTED ? 'red' : 'gray'
                                    }
                                    created={DisplayDateAndHourtString(String(item.created_at))}
                                    note={item.description}
                                    attach={item.attach}
                                    isApproved={item.status !== ENUN_REQUEST.PENDING}
                                    handleEdit={() => handleEdit({ id: item.id, typeId: item.Type_Solicitation_Doc.id, description: String(item.description) })}
                                    handleDelete={() => handleDelete(item.id)}
                                    handleViewAttach={() => handleViewAttach(item.attach ?? '')}
                                    handleDownloadAttach={() => handleDownloadAttach(item.attach ?? '')}
                                  />
                                </Box>
                              ))
                            }
                        </SimpleGrid>
                      </>
                    ) : (
                      <>
                        <EmptyEvent
                          icon={<FaRegFilePdf size={22} />}
                          title={'Nenhuma Solicitação'}
                          bgColor={'#f2f2f2'}
                        />
                      </>
                    )}
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
        isOpen={isOpenModalDocument}
        onClose={handleCloseModalDocument}
        title="Solicitação de Documentos"
        description="Solicite o tipo Documento de acordo a tua necessidade."
        size={'lg'}
      >
        <RequestFormDocument 
        handleCloseModal={handleCloseModalDocument} 
        valueEditModal={valueEditModal} 
        reload={init}
        isReload={true}
        />
      </Modal>

    </>
  )
}
