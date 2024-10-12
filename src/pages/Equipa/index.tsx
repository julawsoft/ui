import { Envelope } from 'phosphor-react'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'

import { useNavigate } from 'react-router-dom'
import useColabContext from '../../context_api'
import { CardGlobal } from './Cards/CardGlobal'
import { CardRequest } from './Cards/CardRequest'
import { useEffect, useState } from 'react'
import useAsyncState from '../../hooks/use-async-state'
import { IManager, IManagerEmployees } from '../../schema/Employee'
import { toast } from 'react-toastify'
import getLideradosByManagerService from '../../services/Employee/get-lidarandos-by-manager-id.service'
import { TitleBox } from '../../components/Profile/TitleBox'
import { Title } from '../../components/Title'
import { TitleValue } from '../../components/Profile/TitleValue'
import { TitleValueIcon } from '../../components/Profile/TitleValueIcon'
import { ROUTES } from '../../routes/constants'
import { Divider } from '../../components/Divider'
import CardHeaderUser from '../../components/CardHeaderUser'

// components
interface ICardUser {
  userName: string
  image: string
  userFunction: string
  email: string
  status: string
}

export function CardUser({
  userName,
  image,
  userFunction,
  email,
  status,
}: ICardUser) {
  return (
    <Flex
      width={'100%'}
      shadow={'md'}
      bgColor={'#fff'}
      border={'1px solid gray.50'}
      borderRadius={'6'}
      p={2}
    >
      <Flex
        p={2}
        gap={3}
        alignItems={'center'}
        color={'colab.sidebar'}
        width={'90%'}
        justifyContent={'space-between'}
      >
        <Flex gap={2}>
          <Avatar size={'lg'} name={userName} src={image}></Avatar>
          <Flex flexDirection={'column'}>
            <Text fontSize={'18px'} fontWeight={'medium'}>
              {userName}
            </Text>
            <Text fontSize={'11px'}>{userFunction}</Text>
            <Flex alignItems={'center'} gap={1}>
              <Envelope size={10} />
              <Text fontSize={'11px'}>{email}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Badge p={2} colorScheme={status === 'ACTIVE' ? 'green' : 'red'}>
            {status}
          </Badge>
        </Box>
      </Flex>
    </Flex>
  )
}

export function Equipa() {
  const { colabProvider } = useColabContext()
  const navigate = useNavigate()

  const handleLink = (url: string, params) => {
    navigate(url, { state: { ...params } })
  }

  const [showAll, setShowAll] = useState<boolean>(false)
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
    getLideradosByManager()
  }, [])

  return (
    <>
      {colabProvider && 
        (<CardHeaderUser 
            name={colabProvider.user.name} 
            photo={colabProvider.user.image} 
            role={colabProvider.user.funcao} 
            status={'ACTIVO'} 
          />
        )
      }

      <Flex height={'100%'} flexDirection={'column'} bgColor={''}>
        <HeaderWithNav borderBox={''} title={'Tua Equipa'} />
        <Flex width={'100%'} gap={2}>
          <Grid templateColumns={'2fr 1fr'} width={'100%'} gap={8}>
            <GridItem>
              <Flex flexDirection={'column'} gap={4}>
                {
             /* 
             <CardUser
                userName={colabProvider.user.name}
                image={colabProvider.user.image ?? ''}
                userFunction={colabProvider.user.funcao}
                email={colabProvider.user.email ?? 'Nenhum definido'}
                status={'ACTIVE'}
              />
             */}
                <Flex
                  width={'100%'}
                  borderRadius={'6'}
                  height={'100%'}
                  minHeight={'350px'}
                  gap={6}
                  flexDirection={'column'}
                >
                  <Box p={2}>
                    <Text fontSize={'16px'} fontWeight={'bold'}>
                      Solicitações da tua equipa
                    </Text>
                    <Divider />
                  </Box>
                  <CardGlobal showAll={showAll} setShowAll={setShowAll}>
                    <CardRequest showAll={showAll} />
                  </CardGlobal>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex flexDirection={'column'}>
                <TitleBox mb={2}>
                  <Title title={'Departamentos'} />
                  <TitleValue
                    value={
                      liderandos?.manager
                        ? liderandos?.manager.Employee.Organogram.description
                        : <Text fontWeight={'regular'}> {'Nenhum Departamento'}</Text>
                    }
                    link={''}
                    onClick={handleLink}
                    params={''}
                  />
                </TitleBox>
                <TitleBox mb={1}>
                  <Title title={'Chefia Directo'} />
                  {liderandos?.manager && liderandos?.manager.Employee_Manager ? (
                    <TitleValueIcon
                      key={1}
                      size={'xs'}
                      src={''}
                      link={''}
                      params={''}
                      value={liderandos?.manager.Employee_Manager.name}
                      onClick={() =>
                        handleLink(ROUTES.Profile, {
                          id: liderandos.manager.Employee_Manager.id,
                        })
                      }
                    />
                  ) : (
                    <Text fontWeight={'regular'}> {'Nenhum Chefia Directo'}</Text>
                  )}
                </TitleBox>

                <Title title={'Equipa'} />
                {liderandos?.employees
                  ? liderandos.employees.map((item, index) => (
                    <TitleBox mb={2} key={index}>
                      <TitleValueIcon
                        key={index}
                        size={'xs'}
                        src={''}
                        value={item.Employee.name}
                        link={''}
                        params={''}
                        onClick={() =>
                          handleLink(ROUTES.Profile, { id: item.Employee.id })
                        }
                      />
                    </TitleBox>
                  ))
                  : 'N/A'}
                {/* <TitleBox mb={6}>
                <Title title={"Próximos a si"} />
                <TitleValueIcon
                  key={4}
                  size={"xs"}
                  src={""}
                  value={"Recursos Humanos"}
                  link={""}
                  params={""}
                  onClick={handleLink}
                />
                <TitleValueIcon
                  key={5}
                  size={"xs"}
                  src={""}
                  value={"Recursos Humanos"}
                  link={""}
                  params={""}
                  onClick={handleLink}
                />
              </TitleBox> */}
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>

    </>
  )
}
