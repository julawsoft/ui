import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { List } from 'phosphor-react'
import { EmptyEvent } from '../../../components/EmptyEvent'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { IManagerEmployeesAbsence } from '../../../schema/Employee'
import { DisplayDateAndHourtString, organizedData } from '../../../utils/convertDatas'
import { RequestFormEdit } from '../../../components/RequestForm/Edit/edit'
import { homeCardRequestDocumentService } from '../../../services/Home/homeRequest'
import { Modal } from '../../../components/Forms/Modal'
import { IDocumentDTORequest, IHomeCardRequestById } from '../../../schema/HomeCard'
import useSolicitation from '../../../hooks/useSolicitation'
import { pathStaticFilesUserProfile } from '../../../utils/pathStaticFiles'
import { CardRequestItem } from './CardRequestItem'
import { ENUN_REQUEST } from '../utils'
import { CardRequestHome } from '../../../components/CardRequestHome'
import { FaRegFilePdf } from 'react-icons/fa'
import { translate } from '../../../utils/language/pt'
import { CardRequestHomeRH } from '../../../components/CardRequestHome/cardRequestHomeRH'
import { RequestFormDocument } from '../../../components/RequestFormDocument'
import { IValueEditModal } from '../../Home'
import { RequestFormDocumentRH } from '../../../components/RequestFormDocument/requestFormDocumentRH'
import { swicthStatusBorderBottomColor } from '../transform'
import { downloadFile } from '../../../utils/download'

type CardRequestType = {
  showAll: boolean
  setShowAll: any
  requestType: number | null
  departamentSelected: number | null
}

export function CardRequestDocument({
  showAll,
  setShowAll,
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

  const [dataDocuments, setDataDocuments] = useState<IDocumentDTORequest[]>([])
  const [valueItemDocument, setValueItemDocument] = useState<IDocumentDTORequest>()

  useEffect(() => {
    if (reload) handleReload()
    init()
  }, [showAll, requestType, departamentSelected, reload,])

  const init = () => {
    getListDocuments()
  }

  const handleReload = () => {
    init()
    setTimeout(() => {
      setReloadSolicitacao(false)
    }, 1000)
  }


  const handleCloseModal = () => {
    setIsOpen(false)
    // init()
  }

  const getListDocuments = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        let status = showAll ? '' : ENUN_REQUEST.PENDING
        const response = await homeCardRequestDocumentService(1000, status)
        console.log("here")
        setDataDocuments(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleView = (item: IDocumentDTORequest ) => {
    console.log("view")
    setValueItemDocument(item)
    setIsOpen(true)
  }


  const handleViewAnexoSelected = (attach: string) => {
    const path = `${import.meta.env.VITE_BASE_URI}open_document/${attach}`
    window.open(path, '_blank', 'noopener,noreferrer')
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
              {dataDocuments && dataDocuments.length ? (
                <Flex width={'100%'} flex={1}>
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    spacingX={5}
                    spacingY={5}
                    width={'100%'}
                  >
                    {
                      dataDocuments.map((item: IDocumentDTORequest) => (
                        <Box>
                          <CardRequestHomeRH
                            employee={item.Employee.name}
                            image=''
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
                            noteReject={item.notes_rejection}
                            attach={item.attach}
                            isApproved={item.status !== ENUN_REQUEST.PENDING} 
                            handleView={() => handleView(item)}
                            handleEdit={function (): void {
                              throw new Error('Function not implemented.')
                            }} 
                            handleDelete={function (): void {
                              throw new Error('Function not implemented.')
                            }} 
                            handleViewAttach={() => handleViewAnexoSelected(item.attach ?? '')}
                            handleDownloadAttach={() =>handleDownloadAttach(item.attach ?? '')}
                          />
                        </Box>
                      ))
                    }
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
        title={'Solicitação de Documento'}
        description={'Por favor, aprova ou rejeita a solicitação.'}
        size={'lg'}
      >
         <RequestFormDocumentRH 
        handleCloseModal={handleCloseModal} 
        valueItemDocument={valueItemDocument} 
        setShowAll={setShowAll}
        />
      </Modal>
    </>
  )
}
