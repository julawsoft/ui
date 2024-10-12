import { Eye } from 'phosphor-react'
import { Flex } from '@chakra-ui/react'
import { INotifications } from '../../schema/Notifications'

import { convertDataHours } from '../../utils/convertDatas'

export const columns: any = [
  {
    id: 'id',
    name: '#',
    isSortable: true,
  },
  {
    id: 'description',
    name: 'Descrição',
    isSortable: true,
  },
  {
    id: 'status',
    name: 'Estado',
    isSortable: true,
  },
  {
    id: 'created_at',
    name: 'Data Criada',
    isSortable: true,
  },
  {
    id: 'options',
    name: 'Opções',
    isSortable: false,
  },
]

export function dataTransform(data: INotifications[], handleView: any) {
  return data.length
    ? data.map((item: INotifications, key: number) => ({
        id: `${key + 1}`,
        description: item.description,
        status: `${item.status === 1 ? 'Não Lida' : 'Lida'}`,
        created_at: convertDataHours(item.created_at),
        options: (
          <Flex
            gap={3}
            onClick={() =>
              handleView(item.flag, item.employee_id, item.operation_id)
            }
          >
            <Eye size={20} cursor={'pointer'} color="#a8a5a5" key={key} />
          </Flex>
        ),
      }))
    : []
}
