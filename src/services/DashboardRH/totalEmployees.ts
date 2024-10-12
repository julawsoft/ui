import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'

export async function getTotalEmployees(): Promise<number> {
  const response = await new RequestApi().get<number>(END_POINTS.totalEmployees)
  return response.data
}
