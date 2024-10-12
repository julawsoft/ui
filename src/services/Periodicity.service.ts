import { IPeriodicity } from '../schema/Periodicity'
// import { RequestApi } from '../utils/request'

const data: IPeriodicity[] = [
  {
    id: 1,
    name: 'Determinado',
    description: '',
    status: 1,
  },
  {
    id: 2,
    name: 'Indeterminado',
    description: '',
    status: 1,
  },
]

export async function getPeriodicity() {
  return data
  // const response = await new RequestApi().get<IPeriodicity[]>('periodicity')
  // return response.data
}
