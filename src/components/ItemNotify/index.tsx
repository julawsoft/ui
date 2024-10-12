import { Avatar } from '@chakra-ui/react'
import { INotifications } from '../../schema/Notifications'
import { convertDataHours } from '../../utils/convertDatas'
import { switchFlagItemNotify } from '../../utils/notifications/switchPathDetails'

import { Center, Container, Data, Description, Flag, Left } from './styled'

interface IItemNotify {
  item: INotifications
  key: number
  onClick: any
}

export function ItemNotify({ item, key, onClick }: IItemNotify) {
  return (
    <Container
      onClick={() =>
        onClick(item.flag, item.employee_id, item.operation_id, item.id)
      }
      key={key}
    >
      <Left>
        <Avatar
          size="sm"
          name={item.Employee ? item.Employee.name : '?'}
          src=""
        ></Avatar>
      </Left>
      <Center>
        <Description>{item.description}</Description>
        <Flag>{switchFlagItemNotify(item.flag)}</Flag>
        <Data>
          {convertDataHours(item.created_at ?? new Date().toLocaleDateString())}
        </Data>
      </Center>
    </Container>
  )
}
