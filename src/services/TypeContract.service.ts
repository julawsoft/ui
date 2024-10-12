import { ITypeContract } from '../schema/TypeContract'
// import { RequestApi } from '../utils/request'

const data: ITypeContract[] = [
  {
    id: 1,
    name: '1 mês',
    description: '',
    status: 1,
  },
  {
    id: 2,
    name: '3 mêses',
    description: '',
    status: 1,
  },
  {
    id: 3,
    name: '6 mêses',
    description: '',
    status: 1,
  },
  {
    id: 4,
    name: '12 mêses',
    description: '',
    status: 1,
  },
]

export async function getTypeContract() {
  return data
  // const response = await new RequestApi().get<ITypeContract[]>('type_contract')
  // return response.data
}
