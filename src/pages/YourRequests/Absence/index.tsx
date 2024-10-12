import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'

import { CardGlobal } from './Cards/CardGlobal'
import { CardRequest } from './Cards/CardRequest'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CardUser } from '../Components/CardUser'
import useColabContext from '../../../context_api'
import { IManager, IManagerEmployees } from '../../../schema/Employee'
import useAsyncState from '../../../hooks/use-async-state'
import getLideradosByManagerService from '../../../services/Employee/get-lidarandos-by-manager-id.service'
import { HeaderWithNav } from '../../../components/Navs/HeaderWithNavs'
import { Divider } from '../../../components/Divider'

export function Title({ title }) {
  return (
    <Text textTransform={'uppercase'} fontWeight={'medium'}>
      {title}
    </Text>
  )
}
export function TitleValue({ value, link, params, onClick }) {
  return (
    <Text
      _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() => onClick(link, params)}
    >
      {value}
    </Text>
  )
}
export function TitleValueIcon({
  key,
  value,
  size,
  src,
  link,
  params,
  onClick,
}) {
  return (
    <Flex gap={2} alignItems={'center'} key={key}>
      <Avatar src={src} size={size}></Avatar>
      <TitleValue value={value} link={link} params={params} onClick={onClick} />
    </Flex>
  )
}
export function TitleBox({ children, mb }) {
  return (
    <Flex gap={2} flexDirection={'column'} mb={mb}>
      {children}
    </Flex>
  )
}


export function YourAbsence() {
  const { colabProvider } = useColabContext()

  const [showAll, setShowAll] = useState<boolean>(false)
  const [requestTypeSelected, setRequestTypeSelected] = useState<number>(0)
  const [departamentSelected, setDepartamentSelected] = useState<number>(0)
  const [liderandos, setLiderandos] = useState<IManagerEmployees>()

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
    console.log('tuas solicitações')
    getLideradosByManager()
  }, [])

  return (
    <Flex height={'100%'} flexDirection={'column'} bgColor={''}>
      <Flex width={'100%'} gap={2} mt={2}>
        <Grid templateColumns={'1fr'} width={'100%'} gap={8}>
          <GridItem>
            <Flex flexDirection={'column'} gap={4}>
              <Box p={2}>
                <Text fontSize={'16px'} fontWeight={'bold'}>
                  Tuas Solicitações de Ausências
                </Text>
                <Divider />
              </Box>
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
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  )
}
