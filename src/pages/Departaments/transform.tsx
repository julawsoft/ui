import { StatusTable } from '../../components/StatusTable'
import { ArrowDownRight, ArrowUpRight, ListBullets } from 'phosphor-react'
import { Box, Text } from '@chakra-ui/react'
import { IEmployee } from '../../schema/Employee'
import { NavLink } from 'react-router-dom'

export const columns: any = [
  {
    id: 'id',
    name: '#',
    isSortable: true,
  },
  {
    id: 'colaborador',
    name: 'Colaborador(a)',
    isSortable: true,
  },
  {
    id: 'funcao',
    name: 'Função',
    isSortable: true,
  },
  {
    id: 'category',
    name: 'Categoria',
    isSortable: true,
  },
  {
    id: 'department',
    name: 'Departamento',
    isSortable: true,
  },
  {
    id: 'status',
    name: 'Estado',
    isSortable: true,
  },
]

export function dataTransform(
  data: IEmployee[],
  handleClickEmployee
) {
  return data.length
    ? data.map((item: IEmployee, key: number) => ({
        id: key + 1,
        colaborador: (
            <Text 
            onClick={() => handleClickEmployee(item.id)}
            >
              {item.name}
            </Text>
            ),

        funcao: 'Não informado',
        category: 'Não informado',
        department: 'Não informado',
        status: (
          <StatusTable
            key={key}
            status={Number(item.status) + 1}
            description={`${item.status}`}
          />
        ),
      }))
    : []
}
