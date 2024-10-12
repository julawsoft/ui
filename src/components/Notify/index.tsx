import { Menu, MenuButton, MenuList, Button, Box } from '@chakra-ui/react'

import {
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  ContainerIcon,
  Title,
  TopDivider,
} from './styled'
import { Bell } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

import { INotifications } from '../../schema/Notifications'

import { NotifictionsService } from '../../services/Notifications'
import { ItemNotify } from '../ItemNotify'
// import useNotification from '../../context_api'

export function Notify(props: any) {
  // const { removeNotification } = useNotification()
  const navigate = useNavigate()
  const handleOpen = async (
    url: string,
    employeeId: number,
    operationId: number,
    id: number,
  ) => {
    await updateNotificationsStatus(employeeId, id)
    navigate(url, { state: { id: operationId } })
  }

  const navigateTo = (url: string) => {
    navigate(url)
  }

  const updateNotificationsStatus = async (employeeId: number, id: number) => {
    await NotifictionsService.updateByStatusNotificationsEmployee(
      employeeId,
      id,
    )
  }

  return (
    <Menu>
      <MenuButton as={Button} bg="transparent" className={''}>
        {props.active ? (
          <ContainerIcon>
            <span>{props.count > 9 ? '9+' : props.count}</span>
            <Bell size={24} />
          </ContainerIcon>
        ) : (
          <>
            <Bell size={24} />
          </>
        )}
      </MenuButton>
      <MenuList width={350} zIndex={2}>
        <Container>
          <CardHeader>
            <Title>Notificações</Title>
            <TopDivider></TopDivider>
          </CardHeader>
          <CardBody>
            {props.notifications.length > 0 ? (
              <>
                <Box width={315} maxHeight={300} overflowY={'auto'}>
                  {props.notifications.map(
                    (item: INotifications, key: number) => {
                      return (
                        <>
                          <ItemNotify
                            item={item}
                            key={key}
                            onClick={handleOpen}
                          />
                        </>
                      )
                    },
                  )}
                </Box>
              </>
            ) : (
              <> Nenhuma notificação por lêr!</>
            )}
          </CardBody>
          <CardFooter>
            <Box key={'-1'}>
              <Button
                type="button"
                as={'a'}
                colorScheme="yellow"
                onClick={() => navigateTo('notifications')}
                size={'sm'}
                color={'#fff'}
                width={'70px'}
                fontSize={'12px'}
                cursor={'pointer'}
                title={'Clica para ver todas as Notificações'}
              >
                Ver todas
              </Button>
            </Box>
          </CardFooter>
        </Container>
      </MenuList>
    </Menu>
  )
}

/*
function dispatch(arg0: { payload: import("../../redux/slices/notifications").INotifications[]; type: "notifications/setDataNotifications" }) {
  throw new Error('Function not implemented.')
}
*/
