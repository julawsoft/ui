import { useEffect, useState } from 'react'
import useAsyncState from '../../../hooks/use-async-state'
import { Flex, Text } from '@chakra-ui/react'
import { LoaderLocal } from '../../../components/LoaderLocal'
import { EmptyEvent } from '../../../components/EmptyEvent'

import {
  homeCardRequestDocumentByIdService,
  homeCardRequestDocumentDeleteService,
} from '../../../services/Home/homeRequest'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { toast } from 'react-toastify'
import { IDocumentDTORequest, IHomeCardRequestById } from '../../../schema/HomeCard'
import { translate } from '../../../utils/language/pt'
import { CardRequestHome } from '../../../components/CardRequestHome'
import { FaRegFilePdf } from "react-icons/fa";
import { pathStaticFilesUserProfile } from '../../../utils/pathStaticFiles'
import { IValueEditModal } from '..'
import { DisplayDateAndHourtString, DisplayDateString } from '../../../utils/convertDatas'
import { ENUN_REQUEST } from '../utils'
import { Modal } from '../../../components/Forms/Modal'

interface CardRequestUserProps {
  userId: number
  setValueEditModal: ({ id, description }: IValueEditModal) => void
  handleCallModalDocument: () => void
}

export function CardRequestUserDocumets({ userId, setValueEditModal, handleCallModalDocument }: CardRequestUserProps) {

  const { loading, setLoading, error, setError, message, setMessage, data, setData } =
    useAsyncState<IDocumentDTORequest[]>()
  const [isReloading, setIsReloading] = useState<boolean>(false)
  const [isOpenModalDocument, setIsOpenModalDocument] = useState<boolean>(false)
  const [viewNotes, setViewNotes] = useState<string>('')

  useEffect(() => {
    if (isReloading) {
      return init()
    }
    init()
  }, [isReloading])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const LIMIT = 2
        const response = await homeCardRequestDocumentByIdService(
          userId, LIMIT
        )
        setData(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
        setIsReloading(true)
      }
    }, 1000)
  }

  const handleReload = async () => init()

  function handleEdit(item: IValueEditModal) {
    setValueEditModal(item)
    handleCallModalDocument()
  }

  function handleDelete(id: number) {
    setTimeout(async () => {
      try {
        const response = await homeCardRequestDocumentDeleteService(id)
        if (response && response.response.statusCode === 200) {
          toast.success('Solicitação eliminida com Sucesso.')
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

  function handleViewAttach(fileName: string) {
    console.log("handle view attach ", fileName)
    const path = pathStaticFilesUserProfile(fileName)
    window.open(path, '_blank', 'noopener,nore')
  }

  const handleViewAnexoSelected = (attach: string) => {
    const path = `${import.meta.env.VITE_BASE_URI}open_document/${attach}`
    window.open(path, '_blank', 'noopener,noreferrer')
  }

  const handleViewNotes = (notes: string) => {
    console.log("handle notes ", notes)
  }

  const handleCloseModalDocument = () => {
    setIsOpenModalDocument(false)
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
                  Documentos Solicitados
                </Text>
              </Flex>
              {data && data.length ? (
                <>
                  <Flex flexDirection={'column'} gap={2}>
                    {
                      data.map((item: IDocumentDTORequest) => (
                        <CardRequestHome
                          icon={<FaRegFilePdf />}
                          solicitacao={item.Type_Solicitation_Doc.description}
                          status={translate(item.status)}
                          created={DisplayDateAndHourtString(String(item.created_at))}
                          note={item.description}
                          statusText={item.status === ENUN_REQUEST.APPROVED ?
                            'green'
                            : item.status === ENUN_REQUEST.REJECTED ? 'red' : 'gray'}
                          attach={item.attach}
                          isApproved={item.status !== ENUN_REQUEST.PENDING}
                          handleEdit={() => handleEdit({ id: item.id, typeId: item.Type_Solicitation_Doc.id, description: String(item.description) })}
                          handleDelete={() => handleDelete(item.id)}
                          handleViewAttach={() => handleViewAnexoSelected(item.attach ?? '')}
                          handleView={() => handleViewNotes(item.description)} handleDownloadAttach={function (): void {
                            throw new Error('Function not implemented.')
                          } }                        />
                      ))
                    }
                  </Flex>
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
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
    
  )
}
