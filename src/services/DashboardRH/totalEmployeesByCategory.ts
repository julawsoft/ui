import { RequestApi } from '../../utils/request'
import END_POINTS from './constants'
import { IEmployeesByCategory } from './interfaces'

export async function getTotalEmployeesByCategory(): Promise<
  IEmployeesByCategory[]
> {
  const response = await new RequestApi().get<IEmployeesByCategory[]>(
    END_POINTS.totalEmployeesByCategory,
  )
  return response.data
}
