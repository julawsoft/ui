import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import { CardGlobal } from '../Components/CardGlobal'
import { CardRequest } from '../Components/CardRequest'
import { useEffect, useState } from 'react'
import useColabContext from '../../../context_api'
import { IManager, IManagerEmployees } from '../../../schema/Employee'
import { IDocumentDTORequest } from '../../../schema/HomeCard'
import { homeCardRequestDocumentService } from '../../../services/Home/homeRequest'
import getLideradosByManagerService from '../../../services/Employee/get-lidarandos-by-manager-id.service'
import useAsyncState from '../../../hooks/use-async-state'
import { toast } from 'react-toastify'
import { ENUN_REQUEST } from '../utils'

export function CardAusencia() {

  const { colabProvider } = useColabContext()

  const [showAll, setShowAll] = useState<boolean>(false)
  const [requestTypeSelected, setRequestTypeSelected] = useState<number>(0)
  const [departamentSelected, setDepartamentSelected] = useState<number>(0)
  const [liderandos, setLiderandos] = useState<IManagerEmployees>()
  const [dataDocuments, setDataDocuments] = useState<IDocumentDTORequest[]>([])

  const { setLoading, setError, setMessage } = useAsyncState<IManager>()

  const getLideradosByManager = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await getLideradosByManagerService()
        setLiderandos(response)
      } catch (error) {
        setError(true)
        setMessage(String(error))
        toast.error(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    getLideradosByManager()
    getListDocuments()
  }, [])


  const getListDocuments = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestDocumentService(100, ENUN_REQUEST.PENDING)
        setDataDocuments(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }



  return (
    <>
      <Box mt={5}></Box>
      <Flex flexDirection={'column'} gap={4}>
        <Flex
          width={'100%'}
          borderRadius={'6'}
          height={'100%'}
          minHeight={'350px'}
          gap={6}
          flexDirection={'column'}
        >
          <CardGlobal
            showAll={showAll}
            setShowAll={setShowAll}
            setRequestTypeSelected={setRequestTypeSelected}
            setDepartamentSelected={setDepartamentSelected}
          >
            <CardRequest
              showAll={showAll}
              requestType={requestTypeSelected}
              departamentSelected={departamentSelected}
            />
          </CardGlobal>
        </Flex>
      </Flex>
    </>
  )
}
